// Unit tests for feedback_backend/Code.gs using Node's built-in runner.
// Run:  node --test feedback_backend/tests/
// Code.gs is loaded in a VM sandbox with minimal stubs for the Apps Script services.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function load() {
  const rows = [];
  const sheet = {
    appendRow: (r) => rows.push(r),
    getLastRow: () => rows.length + 1,
  };
  const sandbox = {
    rows,
    ContentService: {
      MimeType: { JSON: 'json' },
      createTextOutput: (s) => ({ text: s, setMimeType() { return this; } }),
    },
    SpreadsheetApp: { getActiveSpreadsheet: () => ({ getSheetByName: () => sheet }) },
    LockService: { getScriptLock: () => ({ waitLock() {}, releaseLock() {} }) },
    Utilities: { formatDate: (d, tz, fmt) => d.toISOString().slice(0, 10) },
    Session: { getScriptTimeZone: () => 'America/New_York' },
    console,
  };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'Code.gs'), 'utf8'), sandbox);
  return sandbox;
}

const post = (sb, obj) =>
  JSON.parse(sb.doPost({ postData: { contents: JSON.stringify(obj) } }).text);

const good = { weakest: 'baseline is weak', elapsed_ms: 8000, website: '' };

test('accepts a valid submission and stores date + fields only', () => {
  const sb = load();
  assert.deepStrictEqual(post(sb, good), { ok: true });
  assert.strictEqual(sb.rows.length, 1);
  const row = sb.rows[0];
  assert.match(row[0], /^\d{4}-\d{2}-\d{2}$/, 'first column is a date with no time of day');
  assert.strictEqual(row[1], 'baseline is weak');
  assert.strictEqual(row.length, 1 + 8);
});

test('does not store transport metadata sent by a client', () => {
  const sb = load();
  post(sb, { ...good, ip: '1.2.3.4', userAgent: 'X', timestamp: 'now' });
  assert.ok(!JSON.stringify(sb.rows).includes('1.2.3.4'));
  assert.ok(!JSON.stringify(sb.rows).includes('"X"'));
});

test('rejects honeypot', () => {
  const sb = load();
  assert.strictEqual(post(sb, { ...good, website: 'http://spam' }).error, 'rejected');
  assert.strictEqual(sb.rows.length, 0);
});

test('rejects too-fast and missing elapsed time', () => {
  const sb = load();
  assert.strictEqual(post(sb, { ...good, elapsed_ms: 500 }).error, 'too_fast');
  assert.strictEqual(post(sb, { weakest: 'x' }).error, 'too_fast');
  assert.strictEqual(sb.rows.length, 0);
});

test('rejects empty content and metadata-only submissions', () => {
  const sb = load();
  assert.strictEqual(post(sb, { elapsed_ms: 8000 }).error, 'empty');
  assert.strictEqual(
    post(sb, { elapsed_ms: 8000, role: 'Industry', contact: 'a@b.c', paper: 'P' }).error, 'empty');
  assert.strictEqual(post(sb, { elapsed_ms: 8000, weakest: '   ' }).error, 'empty');
  assert.strictEqual(sb.rows.length, 0);
});

test('truncates over-long fields', () => {
  const sb = load();
  post(sb, { ...good, weakest: 'a'.repeat(20000) });
  assert.strictEqual(sb.rows[0][1].length, 5000);
});

test('neutralizes spreadsheet formulas', () => {
  const sb = load();
  post(sb, { ...good, weakest: '=HYPERLINK("http://evil","x")' });
  assert.strictEqual(sb.rows[0][1][0], "'");
});

test('malformed body returns an error instead of throwing', () => {
  const sb = load();
  const out = JSON.parse(sb.doPost({ postData: { contents: 'not json' } }).text);
  assert.strictEqual(out.ok, false);
  const out2 = JSON.parse(sb.doPost({}).text);
  assert.strictEqual(out2.ok, false);
});

test('ignores non-string field values', () => {
  const sb = load();
  const r = post(sb, { ...good, methods: { a: 1 }, overlap: 42 });
  assert.strictEqual(r.ok, true);
  assert.strictEqual(sb.rows[0][2], '');
});

test('Code.gs never reads request headers, parameters, or user agent', () => {
  const src = fs.readFileSync(path.join(__dirname, '..', 'Code.gs'), 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')   // block comments
    .replace(/^\s*\/\/.*$/gm, '');      // whole-line comments
  assert.ok(!/userAgent|User-Agent|getActiveUser|getEffectiveUser|e\.parameter|e\.headers/i.test(src));
});
