#!/usr/bin/env node
/**
 * verify-rates.mjs — 讓過期或不一致的費率資料在 CI 就失敗，不要等使用者發現。
 *
 * 為什麼需要這支
 * --------------
 * 這個站的 /zh/tools/costco-membership/ 標題寫 2026，內容卻是：
 *   金星 NT$1,350、商業 NT$1,150、「尊榮會員」、回饋上限 NT$10,000、回本門檻 82,500
 * 實際上 2026 年是金星與商業都 1,500、黑鑽 3,000、回饋上限 30,000、門檻 75,000。
 * 同一頁還有兩套互相矛盾的「計算方法」區塊，查核日期一個 7/18 一個 7/07，
 * 一邊說「沒有引用任何外部數字」一邊又列官方來源，還殘留美國的 65/130 範例。
 *
 * 金融屬於 YMYL。錯的數字比沒有數字更傷，而且人工不可能每季記得去對。
 * 這支腳本把「資料會過期」變成 build 失敗。
 *
 * 檢查項目
 * --------
 *   1. 每筆費率都有 source（https）、checked（ISO 日期）與 keywords
 *   2. checked 距今沒有超過 $review_interval_days
 *   3. 回本門檻 = 升級價差 ÷ 回饋率（自己驗算，不接受寫死的數字）
 *   4. 原始碼裡沒有任何硬寫的費率數字繞過這份資料源
 *
 * 第 4 項為什麼用「關鍵字鄰近」而不是全檔掃描
 * --------------------------------------------
 * 最早的版本是掃整個 src/ 找費率數字，結果 590 筆警告裡絕大多數是假的：
 * 電動車補助的 30000、電信月租的 3000、信用卡年費示範的 3000，
 * 跟好市多會員費沒有任何關係。那種訊噪比的檢查，第一週就會被關掉。
 *
 * 現在的規則是：只有當費率數字出現在該群組 keywords 附近
 * （$guard.context_lines 行以內）才算繞過資料源。這樣
 *   - 新增一頁好市多內容並寫死年費 → 一定被抓到（那頁必然提到好市多）
 *   - 別的計算機用到同一個數字 → 不會誤判
 * 而且新增費率群組時只要帶上自己的 keywords，防線就自動涵蓋。
 *
 * 用法
 * ----
 *   node scripts/verify-rates.mjs                    # 只檢查資料
 *   node scripts/verify-rates.mjs --src src          # 同時掃描原始碼找硬寫數字
 *   node scripts/verify-rates.mjs --warn-only        # 只警告不失敗（本機用）
 *
 * package.json：
 *   "prebuild": "node scripts/verify-rates.mjs --src src"
 *
 * Node 18+，零相依。
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const argv = process.argv.slice(2);
const flag = (n, d = null) => {
  const i = argv.indexOf(`--${n}`);
  if (i === -1) return d;
  const v = argv[i + 1];
  return v && !v.startsWith("--") ? v : true;
};
const RATES = flag("rates", "data/rates.json");
const SRC = flag("src", null);
const WARN_ONLY = argv.includes("--warn-only");

let errors = 0, warns = 0;
const err = (m) => { console.error(`  ✗ ${m}`); errors++; };
const warn = (m) => { console.warn(`  ! ${m}`); warns++; };
const ok = (m) => console.log(`  ✓ ${m}`);

if (!fs.existsSync(RATES)) {
  console.error(`找不到 ${RATES}`);
  process.exit(1);
}
const data = JSON.parse(fs.readFileSync(RATES, "utf8"));
const interval = data.$review_interval_days ?? 120;
const guard = data.$guard ?? {};
const contextLines = guard.context_lines ?? 4;
const separators = guard.separators ?? [","];
const excluded = new Set((guard.exclude ?? []).map((p) => path.normalize(p)));
const today = new Date();

console.log(`檢查 ${RATES}（複查週期 ${interval} 天）\n`);

// ---------------------------------------------------------------- 1~3
const groups = Object.entries(data).filter(([k, v]) =>
  !k.startsWith("$") && v && typeof v === "object" && v.tiers);

if (!groups.length) err("找不到任何含 tiers 的費率群組");

for (const [key, g] of groups) {
  console.log(`[${key}] ${g.label ?? ""}`);

  // 1. source / checked / keywords
  if (!/^https:\/\//.test(g.source || ""))
    err(`${key}.source 必須是 https 網址，目前是「${g.source ?? "(缺)"}」`);
  if (!Array.isArray(g.keywords) || !g.keywords.length)
    err(`${key}.keywords 不可為空——硬寫費率的掃描靠它定位，沒有 keywords 等於沒有防線`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(g.checked || ""))
    err(`${key}.checked 必須是 YYYY-MM-DD，目前是「${g.checked ?? "(缺)"}」`);
  else {
    const days = Math.floor((today - new Date(g.checked)) / 86400000);
    if (days > interval)
      err(`${key} 的資料已 ${days} 天未複查（上限 ${interval}）。到 ${g.source} 核對後更新 checked。`);
    else if (days > interval * 0.75)
      warn(`${key} 已 ${days} 天未複查，接近 ${interval} 天上限。`);
    else ok(`${key} 於 ${g.checked} 複查（${days} 天前）`);
  }

  // 2. tier 完整性
  for (const [tk, t] of Object.entries(g.tiers ?? {})) {
    if (typeof t.annual_fee !== "number" || t.annual_fee < 0)
      err(`${key}.tiers.${tk}.annual_fee 不是有效數字`);
    if (typeof t.reward_rate !== "number" || t.reward_rate < 0 || t.reward_rate > 1)
      err(`${key}.tiers.${tk}.reward_rate 必須是 0~1 的小數（2% 寫 0.02）`);
    if (t.reward_rate > 0 && typeof t.reward_cap !== "number")
      err(`${key}.tiers.${tk} 有回饋率就必須標明 reward_cap（年度回饋上限）`);
  }

  // 3. 回本門檻自己驗算，不接受寫死的數字
  const tiers = Object.values(g.tiers ?? {});
  const base = tiers.filter((t) => !t.reward_rate).sort((a, b) => a.annual_fee - b.annual_fee)[0];
  const exec = tiers.find((t) => t.reward_rate > 0);
  if (base && exec) {
    const delta = exec.annual_fee - base.annual_fee;
    if (g.upgrade_delta !== undefined && g.upgrade_delta !== delta)
      err(`${key}.upgrade_delta 寫 ${g.upgrade_delta}，但 ${exec.name} ${exec.annual_fee} − ${base.name} ${base.annual_fee} = ${delta}`);
    const computed = Math.round(delta / exec.reward_rate);
    if (g.breakeven_qualified_spend !== computed)
      err(`${key}.breakeven_qualified_spend 寫 ${g.breakeven_qualified_spend}，但 ${delta} ÷ ${exec.reward_rate} = ${computed}`);
    else ok(`${key} 回本門檻 ${computed} 驗算正確（${delta} ÷ ${exec.reward_rate}）`);

    const capSpend = Math.round(exec.reward_cap / exec.reward_rate);
    ok(`${key} 回饋在年消費 ${capSpend.toLocaleString()} 觸頂（上限 ${exec.reward_cap.toLocaleString()}）`);
  }
  console.log();
}

// ---------------------------------------------------------------- 4. 硬寫數字
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * 移除網址與路徑字串後再找關鍵字。
 *
 * /zh/tools/costco-membership/ 這種連結會出現在一般付費會員、信用卡年費等
 * 完全無關的頁面上；把連結當成「這裡在講好市多費率」的證據，會讓無關的
 * NT$1,650 被當成殘留舊費率。真正在講費率的頁面，關鍵字一定也在內文裡。
 */
const stripLinks = (line) => line
  .replace(/https?:\/\/\S+/gi, " ")
  .replace(/(["'`])\/[^"'`]*\1/g, " ");

/** 一個數字的各種寫法：1500、1,500、1.500、1 500。 */
function spellings(n) {
  const digits = String(n);
  const out = new Set([digits]);
  for (const sep of separators) {
    let grouped = "";
    for (let i = 0; i < digits.length; i += 1) {
      const fromEnd = digits.length - i;
      if (i > 0 && fromEnd % 3 === 0) grouped += sep;
      grouped += digits[i];
    }
    if (grouped !== digits) out.add(grouped);
  }
  return [...out];
}

if (SRC && typeof SRC === "string" && fs.existsSync(SRC)) {
  console.log(`掃描 ${SRC} 找繞過資料源的硬寫費率（關鍵字鄰近 ${contextLines} 行內）`);

  const guarded = groups.map(([key, g]) => {
    const nums = new Set();
    for (const t of Object.values(g.tiers ?? {})) {
      nums.add(t.annual_fee);
      if (t.reward_cap) nums.add(t.reward_cap);
    }
    if (g.upgrade_delta) nums.add(g.upgrade_delta);
    if (g.breakeven_qualified_spend) nums.add(g.breakeven_qualified_spend);
    // 歷史數字也要抓——殘留舊費率正是這個站出問題的地方
    for (const h of g.history ?? [])
      for (const v of Object.values(h))
        if (typeof v === "number" && v > 100) nums.add(v);

    const patterns = [...nums]
      .filter((n) => String(n).length >= 3)
      .map((n) => ({
        value: n,
        re: new RegExp(`(?<![\\d.,])(${spellings(n).map(escape).join("|")})(?![\\d.,])`),
      }));
    const keywordRe = new RegExp((g.keywords ?? []).map(escape).join("|"), "i");
    return { key, patterns, keywordRe };
  });

  const walk = (d, out = []) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (e.name === "node_modules" || e.name.startsWith(".")) continue;
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p, out);
      else if (/\.(astro|md|mdx|ts|tsx|js|jsx|svelte|vue)$/.test(e.name)) out.push(p);
    }
    return out;
  };

  let hits = 0;
  for (const f of walk(SRC)) {
    if (f.includes("rates.json")) continue;
    if (excluded.has(path.normalize(f))) continue;
    const lines = fs.readFileSync(f, "utf8").split("\n");

    for (const { key, patterns, keywordRe } of guarded) {
      // 這個群組的關鍵字出現在哪幾行
      // 網址裡的 costco 不算——/zh/tools/costco-membership/ 這種連結會出現在
      // 完全無關的頁面（一般付費會員、信用卡年費），把它當成錨點會誤判。
      // 真正在講好市多費率的頁面，關鍵字一定也出現在看得見的內文裡。
      const anchors = [];
      lines.forEach((line, i) => {
        if (keywordRe.test(stripLinks(line))) anchors.push(i);
      });
      if (!anchors.length) continue;

      lines.forEach((line, i) => {
        // 忽略註解行，減少雜訊
        if (/^\s*(\/\/|\*|<!--|#)/.test(line)) return;
        if (!anchors.some((a) => Math.abs(a - i) <= contextLines)) return;
        for (const { value, re } of patterns) {
          if (re.test(line)) {
            err(`${f}:${i + 1} 在 ${key} 的上下文出現 ${value} —— 應改為從 ${RATES} 讀取`);
            hits++;
            return;
          }
        }
      });
    }
  }
  if (!hits) ok("原始碼中沒有繞過資料源的硬寫費率");
  console.log();
}

// ---------------------------------------------------------------- 結論
console.log("=".repeat(56));
console.log(`錯誤 ${errors}  警告 ${warns}`);
if (errors && !WARN_ONLY) {
  console.error(`
build 中止。金融數字屬於 YMYL，錯的數字比沒有數字更傷。
到各筆資料的 source 核對現行費率，更新 ${RATES} 的數值與 checked 日期，
把被取代的舊值移進該筆的 history 陣列，再重跑。`);
  process.exit(1);
}
if (errors) console.log("（--warn-only：不中止 build）");
