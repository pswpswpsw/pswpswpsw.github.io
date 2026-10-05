# Deploying the anonymous feedback backend (about 10 minutes)

Use a **personal Gmail account**, not the RPI one. A university Google Workspace
admin may block "Anyone" access to web apps, and anonymous feedback stored under a
school account is visible to school IT in principle.

## 1. Create the sheet and script

1. Sign in to your personal Google account and create a new Google Sheet
   (name it e.g. `Anonymous feedback`).
2. In the sheet: **Extensions → Apps Script**.
3. Delete the default `Code.gs` content and paste in the full contents of
   [`Code.gs`](Code.gs).
4. Set `NOTIFY_EMAIL` at the top to your personal address (or leave `''` to disable
   notifications).
5. Click **Save** (disk icon).

## 2. Deploy as a Web App

1. **Deploy → New deployment → ⚙ → Web app**.
2. Description: anything. **Execute as: Me**. **Who has access: Anyone**
   (not "Anyone with Google account": that forces a login and breaks anonymity).
3. **Deploy**, then authorize when prompted (you will see an "unverified app" warning
   because it is your own script; choose *Advanced → Go to ... (unsafe)*).
4. Copy the **Web app URL** (ends in `/exec`).
5. Paste it into [`feedback.html`](../feedback.html): set `data-endpoint="..."` on
   `<form id="feedback-form">`.

Quick check: open the URL in a browser. You should see
`{"ok":true,"message":"Feedback endpoint is alive..."}`.

> Whenever you edit `Code.gs` later, use **Deploy → Manage deployments → ✏ → Version:
> New version → Deploy**. The URL stays the same. Saving alone does not update the live app.

## 3. Optional: daily digest e-mail

In the Apps Script editor choose the function `installDailyDigestTrigger` and press
**Run** once (authorize if asked). You then get one e-mail per day listing new
submissions, only on days that have some.

The digest is deliberately **not** per-submission: an e-mail arriving 5 minutes after
your talk would reveal roughly when someone submitted, which undercuts the
date-only storage.

## 4. Test

Open `feedback.html` on the live site, submit a test message, and check that a new row
appears in the `Feedback` tab. Delete the test row afterwards.

## What you (the owner) can and cannot see

- The sheet holds: date, the answers, and the optional role/contact fields.
  No IP, no user-agent, no exact time.
- Apps Script web apps are not given the visitor's IP address, and `Code.gs` never reads
  request headers.
- **Caveat:** the Apps Script dashboard (**Executions**) logs when the script ran. That
  log does not contain content or IPs, but with very low traffic one could in principle
  line up execution times with rows. If you want to be strict, avoid opening the
  Executions page, and do not tell people when you expect feedback.
- Free-text content can identify people (a specific detail, writing style). The form
  page warns visitors about this.

## Free-tier limits (consumer Gmail)

Roughly 30 simultaneous executions and 100 e-mail recipients per day. Both are far above
what an academic homepage will reach.
