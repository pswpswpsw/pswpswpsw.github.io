/**
 * Anonymous research-feedback backend for www.shaowupan.com/feedback.html
 *
 * Deploy as a Web App:  Execute as = Me,  Who has access = Anyone.
 * See SETUP.md for step-by-step instructions.
 *
 * Privacy design (the public site links to this file so visitors can verify it):
 *   - Apps Script web apps are NOT given the visitor's IP address, and this code
 *     never reads headers or user-agent strings.
 *   - Only the submitted text fields and a DATE (no time of day) are stored.
 *   - New-feedback notifications are sent as a once-a-day digest, so the e-mail
 *     arrival time does not reveal when a particular message was submitted.
 */

// ---- Configuration ---------------------------------------------------------
var SHEET_NAME = 'Feedback';
var NOTIFY_EMAIL = '';          // personal address for the daily digest ('' = disabled)
var MAX_FIELD_LEN = 5000;       // characters kept per field
var MIN_FILL_MS = 3000;         // reject submissions made faster than this (bots)

// Order of columns in the sheet (after the leading "date" column).
var FIELDS = ['weakest', 'methods', 'directions', 'paper', 'paper_feedback',
              'overlap', 'role', 'contact'];
// At least one of these must be non-empty for a submission to count.
var CONTENT_FIELDS = ['weakest', 'methods', 'directions', 'paper_feedback', 'overlap'];

// ---- Web app entry points --------------------------------------------------
function doPost(e) {
  try {
    var raw = (e && e.postData && e.postData.contents) ? e.postData.contents : '';
    var data = JSON.parse(raw);
    var result = validate_(data);
    if (!result.ok) {
      return json_({ ok: false, error: result.error });
    }
    appendRow_(result.clean);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: 'bad_request' });
  }
}

// Visiting the URL in a browser just shows a liveness message.
function doGet() {
  return json_({ ok: true, message: 'Feedback endpoint is alive. Use the form at feedback.html.' });
}

// ---- Validation ------------------------------------------------------------
function validate_(data) {
  if (!data || typeof data !== 'object') return { ok: false, error: 'bad_request' };

  // Honeypot: real users never see or fill this field.
  if (data.website) return { ok: false, error: 'rejected' };

  // Too-fast submissions are almost certainly automated.
  var elapsed = Number(data.elapsed_ms);
  if (!isFinite(elapsed) || elapsed < MIN_FILL_MS) return { ok: false, error: 'too_fast' };

  var clean = {};
  FIELDS.forEach(function (name) {
    var v = data[name];
    v = (typeof v === 'string') ? v.trim() : '';
    clean[name] = v.substring(0, MAX_FIELD_LEN);
  });

  var hasContent = CONTENT_FIELDS.some(function (name) { return clean[name] !== ''; });
  if (!hasContent) return { ok: false, error: 'empty' };

  return { ok: true, clean: clean };
}

// ---- Storage ---------------------------------------------------------------
function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['date'].concat(FIELDS));
  }
  return sheet;
}

function appendRow_(clean) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    // Date only (script time zone) -- deliberately no time of day.
    var date = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
    var row = [date].concat(FIELDS.map(function (name) {
      return neutralizeFormula_(clean[name]);
    }));
    getSheet_().appendRow(row);
  } finally {
    lock.releaseLock();
  }
}

// Stop spreadsheet formula injection (=, +, -, @ at the start of a cell).
function neutralizeFormula_(s) {
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ---- Daily digest (optional) -----------------------------------------------
// Run installDailyDigestTrigger() once from the editor to enable.
function installDailyDigestTrigger() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'sendDailyDigest') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('sendDailyDigest').timeBased().everyDays(1).atHour(8).create();
}

function sendDailyDigest() {
  if (!NOTIFY_EMAIL) return;
  var props = PropertiesService.getScriptProperties();
  var lastRow = Number(props.getProperty('lastNotifiedRow') || 1); // row 1 = header
  var sheet = getSheet_();
  var currentLast = sheet.getLastRow();
  if (currentLast <= lastRow) return;

  var rows = sheet.getRange(lastRow + 1, 1, currentLast - lastRow, FIELDS.length + 1).getValues();
  var body = rows.map(function (r, i) {
    var lines = ['#' + (lastRow + i) + '  (' + r[0] + ')'];
    FIELDS.forEach(function (name, j) {
      if (r[j + 1] !== '') lines.push('  ' + name + ': ' + r[j + 1]);
    });
    return lines.join('\n');
  }).join('\n\n');

  MailApp.sendEmail(NOTIFY_EMAIL,
    '[Anonymous feedback] ' + rows.length + ' new submission(s)', body);
  props.setProperty('lastNotifiedRow', String(currentLast));
}
