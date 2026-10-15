import registry from './redirect-stubs.json';

/** A retired URL and the page that took over from it. Both are site-relative with a trailing slash. */
export interface RedirectStubEntry {
  from: string;
  to: string;
}

export const redirectStubs: RedirectStubEntry[] = registry.stubs;
