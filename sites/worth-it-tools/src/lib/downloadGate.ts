// Email download gate: calculator results stay free on the page (and can be
// copied); downloading an export file asks for an email and the backend
// mails the file. Falls back to the plain local download whenever email
// delivery is not possible, so the user never loses their export.
// Labels are passed in by the rendering component (server-side i18n).

const ENDPOINT = 'https://roomfeng.win/api/download-gate';
const STORAGE_KEY = 'wc_gate_email';
const MAX_EMAIL_FILE_BYTES = 5 * 1024 * 1024;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface GateFile {
  blob: Blob;
  filename: string;
}

export interface GateLabels {
  title: string;
  desc: string;
  emailPlaceholder: string;
  submit: string;
  sending: string;
  sentEmail: string;
  sentLocal: string;
  invalidEmail: string;
  privacyNote: string;
  changeEmail: string;
}

export interface GateRequest {
  tool: string;
  labels: GateLabels;
  getFile: () => Promise<GateFile | null> | GateFile | null;
  fallback: () => void;
  anchor?: HTMLElement | null;
}

let stylesInjected = false;

function currentLang(): 'zh' | 'en' {
  return (document.documentElement.lang || 'en').toLowerCase().startsWith('zh') ? 'zh' : 'en';
}

function track(eventName: string, tool: string, reason?: string) {
  const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === 'function') {
    gtag('event', eventName, { tool_id: tool, reason, page_path: window.location.pathname });
  }
}

function savedEmail(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

function saveEmail(email: string) {
  try {
    window.localStorage.setItem(STORAGE_KEY, email);
  } catch {
    /* private mode */
  }
}

function clearEmail() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

function injectStyles() {
  if (stylesInjected) return;
  stylesInjected = true;

  const style = document.createElement('style');
  style.textContent = [
    '.wc-gate{margin-top:14px;padding:16px;border:1px solid var(--border,#d9d9d9);border-radius:10px;background:var(--surface,#fafafa);display:grid;gap:10px;}',
    '.wc-gate p{margin:0;color:var(--text,#1f1f1f);}',
    '.wc-gate .wc-gate-note{color:var(--text-muted,#6b6b6b);font-size:0.85rem;line-height:1.5;}',
    '.wc-gate form{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;}',
    '.wc-gate input[type=email]{min-height:44px;border:1px solid var(--border,#d9d9d9);border-radius:8px;background:#fff;color:var(--text,#1f1f1f);padding:8px 12px;font:inherit;}',
    '.wc-gate button[type=submit]{min-height:44px;border:none;border-radius:8px;background:var(--accent,#2563eb);color:#fff;padding:8px 18px;font:inherit;cursor:pointer;}',
    '.wc-gate button[type=submit]:disabled{opacity:0.6;cursor:default;}',
    '.wc-gate .wc-gate-change{background:none;border:none;padding:0;color:var(--accent,#2563eb);cursor:pointer;font:inherit;text-decoration:underline;}',
    '@media (max-width:560px){.wc-gate form{grid-template-columns:1fr;}}',
  ].join('\n');
  document.head.appendChild(style);
}

async function resolveFile(request: GateRequest): Promise<GateFile | null> {
  try {
    return await request.getFile();
  } catch {
    return null;
  }
}

async function submitGate(
  email: string,
  request: GateRequest,
  setStatus: (text: string, busy?: boolean) => void,
): Promise<void> {
  const labels = request.labels;
  setStatus(labels.sending, true);
  track('gate_submit', request.tool);

  const formData = new FormData();
  formData.set('email', email);
  formData.set('site', 'worthcalc');
  formData.set('tool', request.tool);
  formData.set('lang', currentLang());
  formData.set('toolUrl', window.location.origin + window.location.pathname);
  formData.set('website', '');

  const file = await resolveFile(request);
  if (file && file.blob.size > 0 && file.blob.size <= MAX_EMAIL_FILE_BYTES) {
    formData.set('file', file.blob, file.filename);
  }

  let payload: { ok?: boolean; delivery?: string; code?: string } | null = null;

  try {
    const response = await fetch(ENDPOINT, { method: 'POST', body: formData });
    payload = (await response.json()) as { ok?: boolean; delivery?: string; code?: string };
  } catch {
    payload = null;
  }

  if (!payload) {
    track('gate_fallback_local', request.tool, 'endpoint_unreachable');
    request.fallback();
    setStatus(labels.sentLocal);
    return;
  }

  if (!payload.ok) {
    if (payload.code === 'invalid_email') {
      setStatus(labels.invalidEmail);
      return;
    }
    track('gate_fallback_local', request.tool, payload.code || 'server_error');
    request.fallback();
    setStatus(labels.sentLocal);
    return;
  }

  saveEmail(email);

  if (payload.delivery === 'email') {
    track('gate_email_sent', request.tool);
    setStatus(labels.sentEmail.replace('{email}', email));
    return;
  }

  track('gate_fallback_local', request.tool, 'delivery_local');
  request.fallback();
  setStatus(labels.sentLocal);
}

function renderPanel(request: GateRequest, mount: HTMLElement, prefill: string): HTMLElement {
  injectStyles();

  const labels = request.labels;
  const existing = mount.parentElement?.querySelector<HTMLElement>('.wc-gate[data-gate-tool="' + request.tool + '"]');
  if (existing) {
    existing.hidden = false;
    existing.querySelector<HTMLInputElement>('input[type=email]')?.focus();
    return existing;
  }

  const panel = document.createElement('div');
  panel.className = 'wc-gate';
  panel.setAttribute('data-gate-tool', request.tool);

  const title = document.createElement('p');
  const strong = document.createElement('strong');
  strong.textContent = labels.title;
  title.appendChild(strong);

  const desc = document.createElement('p');
  desc.className = 'wc-gate-note';
  desc.textContent = labels.desc;

  const form = document.createElement('form');
  form.noValidate = true;

  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.required = true;
  emailInput.placeholder = labels.emailPlaceholder;
  emailInput.autocomplete = 'email';
  emailInput.value = prefill;

  const honeypot = document.createElement('input');
  honeypot.type = 'text';
  honeypot.name = 'website';
  honeypot.tabIndex = -1;
  honeypot.autocomplete = 'off';
  honeypot.setAttribute('aria-hidden', 'true');
  honeypot.style.position = 'absolute';
  honeypot.style.left = '-9999px';

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = labels.submit;

  const status = document.createElement('p');
  status.className = 'wc-gate-status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  status.hidden = true;

  const note = document.createElement('p');
  note.className = 'wc-gate-note';
  note.textContent = labels.privacyNote;

  form.append(emailInput, honeypot, submitButton);
  panel.append(title, desc, form, status, note);
  mount.insertAdjacentElement('afterend', panel);

  const setStatus = (text: string, busy = false) => {
    status.textContent = text;
    status.hidden = !text;
    submitButton.disabled = busy;
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (honeypot.value.trim()) return;

    const email = emailInput.value.trim().toLowerCase();
    if (!EMAIL_PATTERN.test(email)) {
      setStatus(labels.invalidEmail);
      return;
    }

    void submitGate(email, request, setStatus);
  });

  emailInput.focus();
  return panel;
}

export function requestGatedDownload(request: GateRequest): void {
  track('gate_view', request.tool);

  const mount = request.anchor || null;

  if (!mount) {
    request.fallback();
    return;
  }

  const known = savedEmail();

  if (known && EMAIL_PATTERN.test(known)) {
    const panel = renderPanel(request, mount, known);
    const status = panel.querySelector<HTMLElement>('.wc-gate-status');
    const form = panel.querySelector('form');
    const submitButton = panel.querySelector<HTMLButtonElement>('button[type=submit]');
    if (form) form.hidden = true;

    const setStatus = (text: string, busy = false) => {
      if (status) {
        status.textContent = text;
        status.hidden = !text;
      }
      if (submitButton) submitButton.disabled = busy;
    };

    void submitGate(known, request, setStatus).then(() => {
      if (!status || status.hidden) return;
      const change = document.createElement('button');
      change.type = 'button';
      change.className = 'wc-gate-change';
      change.textContent = request.labels.changeEmail;
      change.addEventListener('click', () => {
        clearEmail();
        change.remove();
        if (form) {
          form.hidden = false;
          panel.querySelector<HTMLInputElement>('input[type=email]')?.focus();
        }
      });
      status.append(' ');
      status.appendChild(change);
    });
    return;
  }

  renderPanel(request, mount, '');
}
