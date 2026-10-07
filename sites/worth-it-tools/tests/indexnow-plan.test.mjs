import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createManifest, createPlan, validateManifest, SITE } from '../scripts/indexnow-plan.mjs';
const page = `${SITE}/en/example/`;
const old = `${SITE}/en/removed/`;
const manifest = (pages) => ({ version: 1, site: SITE, pages });
test('unchanged pages produce no submit; changed/new/removed deduplicate', () => {
  const before = manifest({ [page]: 'a'.repeat(64), [old]: 'b'.repeat(64) });
  assert.deepEqual(createPlan(before, before).urls, []);
  const after = manifest({ [page]: 'c'.repeat(64), [`${SITE}/zh/new/`]: 'd'.repeat(64) });
  const plan = createPlan(after, before);
  assert.equal(plan.changed.length, 2);
  assert.deepEqual(plan.removed, [old]);
  assert.equal(plan.urls.length, 3);
});
test('migration initializes a baseline and never submits all sitemap URLs', () => {
  const plan = createPlan(manifest({ [page]: 'a'.repeat(64) }), null);
  assert.equal(plan.mode, 'INITIALIZE_BASELINE');
  assert.equal(plan.urls.length, 0);
  assert.match(plan.reason, /MANUAL_ACTION_REQUIRED/);
});
test('invalid host/state/hash/version refused', () => {
  for (const value of [{version:2,site:SITE,pages:{}}, manifest({'https://other.test/':'a'.repeat(64)}),manifest({[`${page}?state=1`]:'a'.repeat(64)}),manifest({[page]:'bad'}),manifest([])]) assert.throws(() => validateManifest(value));
});
test('manifest includes only canonical sitemap HTML and ignores generator version', () => {
  const dir = mkdtempSync(join(tmpdir(), 'indexnow-test-'));
  try {
    mkdirSync(join(dir, 'en/example'), {recursive:true});
    writeFileSync(join(dir,'sitemap-index.xml'), `<sitemapindex><sitemap><loc>${SITE}/sitemap-0.xml</loc></sitemap></sitemapindex>`);
    writeFileSync(join(dir,'sitemap-0.xml'), `<urlset><url><loc>${page}</loc></url></urlset>`);
    const html = (version, robots='index,follow', canonical=page) => `<meta name="generator" content="Astro ${version}"><meta name="robots" content="${robots}"><link rel="canonical" href="${canonical}"><h1>Example</h1>`;
    const path = join(dir,'en/example/index.html');
    writeFileSync(path,html('1'));
    const first = createManifest(dir);
    writeFileSync(path,html('2'));
    assert.deepEqual(createManifest(dir),first);
    writeFileSync(path,html('2','noindex,follow'));
    assert.throws(()=>createManifest(dir),/Non-indexable/);
    writeFileSync(path,html('2','index,follow',`${SITE}/zh/example/`));
    assert.throws(()=>createManifest(dir),/noncanonical/);
  } finally {rmSync(dir,{recursive:true,force:true});}
});
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
const submissionScript = fileURLToPath(new URL('../scripts/submit-indexnow.mjs',import.meta.url));
function runSubmission(count, statuses=[202], stale=false) {
  const dir=mkdtempSync(join(tmpdir(),'indexnow-submit-test-'));
  try {
    const pages=Object.fromEntries(Array.from({length:count},(_,i)=>[`${SITE}/en/page-${i}/`,'a'.repeat(64)]));
    const current=manifest(pages);
    writeFileSync(join(dir,'plan.json'),JSON.stringify(createPlan(current,manifest({}))));
    const key='mockverificationkey1234';
    writeFileSync(join(dir,'mock.mjs'),`
import {readFileSync,writeFileSync} from 'node:fs';
const plan=JSON.parse(readFileSync('plan.json','utf8'));
let statuses=${JSON.stringify(statuses)};
const calls=[];
globalThis.fetch=async (url,options={})=>{
 if(url==='https://worthcalc.win/indexnow-manifest.json') return new Response(JSON.stringify(${stale?"{version:1,site:'https://worthcalc.win',pages:{}}":"plan.manifest"}),{status:200});
 if(url==='https://worthcalc.win/${key}.txt') return new Response('${key}',{status:200});
 if(url==='https://api.indexnow.org/indexnow') {
  const body=JSON.parse(options.body);calls.push(body.urlList.length);writeFileSync('mock-calls.json',JSON.stringify(calls));
  return new Response('',{status:statuses.shift()??202});
 }
 throw new Error('Unexpected mock request');
};`);
    const result=spawnSync(process.execPath,['--import',pathToFileURL(join(dir,'mock.mjs')).href,submissionScript,'plan.json'],{cwd:dir,env:{...process.env,INDEXNOW_KEY:key},encoding:'utf8',timeout:30000});
    const safeLog=readFileSync(join(dir,'indexnow-submission-log.json'),'utf8');
    assert.equal(safeLog.includes(key),false);
    let calls=[];try{calls=JSON.parse(readFileSync(join(dir,'mock-calls.json'),'utf8'));}catch{ /* Rejected plans intentionally make no POST and create no calls file. */ }
    return {status:result.status,calls,log:JSON.parse(safeLog),accepted:existsSync(join(dir,'indexnow-accepted.json'))};
  } finally {rmSync(dir,{recursive:true,force:true});}
}
test('submitter bounds batches at 50, accepts 202 and logs without key',()=>{
 const r=runSubmission(101);assert.equal(r.status,0);assert.deepEqual(r.calls,[50,50,1]);assert.equal(r.log.count,101);assert.equal(r.accepted,true);
});
test('429 retries same delta and then succeeds',()=>{
 const r=runSubmission(1,[429,202]);assert.equal(r.status,0);assert.deepEqual(r.calls,[1,1]);
});
test('4xx rejection fails visibly without retry',()=>{
 const r=runSubmission(1,[403]);assert.equal(r.status,1);assert.deepEqual(r.calls,[1]);assert.match(r.log.error,/403/);assert.equal(r.accepted,false);
});
test('stale deployment refuses POST',()=>{
 const r=runSubmission(1,[202],true);assert.equal(r.status,1);assert.deepEqual(r.calls,[]);assert.match(r.log.error,/differs/);
});
test('large delta requires review; no bulk request',()=>{
 const r=runSubmission(201);assert.equal(r.status,1);assert.deepEqual(r.calls,[]);assert.match(r.log.reason,/MANUAL_ACTION_REQUIRED/);
});
test('zero delta has no network requests',()=>{
 const r=runSubmission(0);assert.equal(r.status,0);assert.deepEqual(r.calls,[]);
});
