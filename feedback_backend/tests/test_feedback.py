"""End-to-end checks for the anonymous feedback feature.

Run from the repo root:
    uv run --with pytest --with playwright pytest feedback_backend/tests -v
(first time: uv run --with playwright playwright install chromium)
"""
import functools
import http.server
import json
import threading
from pathlib import Path

import pytest
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
PAGES_WITH_SIDEBAR = ["awesome", "index", "letter", "members", "outreach",
                      "projects", "teaching", "feedback"]
MOCK_ENDPOINT = "https://mock-feedback.invalid/exec"


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


@pytest.fixture(scope="session")
def base_url():
    handler = functools.partial(QuietHandler, directory=str(ROOT))
    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    yield f"http://127.0.0.1:{server.server_address[1]}"
    server.shutdown()


@pytest.fixture(scope="session")
def browser():
    with sync_playwright() as p:
        b = p.chromium.launch()
        yield b
        b.close()


@pytest.fixture()
def page(browser):
    ctx = browser.new_context()
    pg = ctx.new_page()
    yield pg
    ctx.close()


def mock_backend(page, response=None, status=200):
    """Intercept the endpoint; record request bodies. Returns the list of bodies."""
    bodies = []
    body = json.dumps(response if response is not None else {"ok": True})

    def handle(route):
        bodies.append(route.request.post_data)
        route.fulfill(status=status, body=body, content_type="application/json",
                      headers={"Access-Control-Allow-Origin": "*"})

    page.route(MOCK_ENDPOINT, handle)
    return bodies


# ---- Sidebar entry -----------------------------------------------------------
@pytest.mark.parametrize("name", PAGES_WITH_SIDEBAR)
def test_sidebar_has_feedback_link(page, base_url, name):
    page.goto(f"{base_url}/{name}.html")
    link = page.locator('#navigation a.nav_item[href="./feedback.html"]')
    assert link.count() == 1
    assert link.inner_text().strip() == "Feedback"


def test_sidebar_link_navigates(page, base_url):
    page.goto(f"{base_url}/index.html")
    page.click('#navigation a[href="./feedback.html"]')
    page.wait_for_url("**/feedback.html")
    assert page.locator("#feedback-form").count() == 1


# ---- Per-paper links ---------------------------------------------------------
def test_every_publication_has_feedback_link(page, base_url):
    page.goto(f"{base_url}/projects.html")
    n_items = page.locator("div.publications > ol > li").count()
    assert n_items > 30
    assert page.locator("div.publications > ol > li a.paper-feedback-link").count() == n_items


def test_paper_link_prefills_title(page, base_url):
    page.goto(f"{base_url}/projects.html")
    first = page.locator("div.publications > ol > li").first
    title = " ".join(first.locator("span.title").inner_text().split())
    first.locator("a.paper-feedback-link").click()
    page.wait_for_url("**/feedback.html*")
    assert page.input_value("#fb-paper") == title


# ---- Form behaviour ----------------------------------------------------------
def test_no_analytics_on_feedback_page(page, base_url):
    requests = []
    page.on("request", lambda r: requests.append(r.url))
    page.goto(f"{base_url}/feedback.html")
    html = page.content()
    assert "googletagmanager" not in html and "gtag(" not in html
    assert not any("google-analytics" in u or "googletagmanager" in u for u in requests)


def test_empty_form_does_not_send(page, base_url):
    page.goto(f"{base_url}/feedback.html")
    page.evaluate("(u) => document.getElementById('feedback-form').dataset.endpoint = u", MOCK_ENDPOINT)
    bodies = mock_backend(page)
    page.click("#fb-submit")
    assert "at least one" in page.inner_text("#fb-status")
    assert bodies == []


def test_only_role_and_contact_is_not_enough(page, base_url):
    page.goto(f"{base_url}/feedback.html")
    page.evaluate("(u) => document.getElementById('feedback-form').dataset.endpoint = u", MOCK_ENDPOINT)
    bodies = mock_backend(page)
    page.select_option("#fb-role", "Industry")
    page.fill("#fb-contact", "someone@example.com")
    page.click("#fb-submit")
    assert bodies == []


def test_unconfigured_endpoint_shows_message(page, base_url):
    page.goto(f"{base_url}/feedback.html")
    page.evaluate("() => document.getElementById('feedback-form').dataset.endpoint = ''")
    page.fill("#fb-weakest", "x")
    page.click("#fb-submit")
    assert "not available" in page.inner_text("#fb-status")


def test_successful_submission_payload(page, base_url):
    page.goto(f"{base_url}/feedback.html?paper=Some%20Paper")
    page.evaluate("(u) => document.getElementById('feedback-form').dataset.endpoint = u", MOCK_ENDPOINT)
    bodies = mock_backend(page)
    page.fill("#fb-weakest", "The baseline is weak")
    page.select_option("#fb-role", "Same field")
    page.click("#fb-submit")
    page.wait_for_selector("#fb-status.success")
    assert len(bodies) == 1
    payload = json.loads(bodies[0])
    assert set(payload) == {"weakest", "methods", "directions", "paper", "paper_feedback",
                            "overlap", "role", "contact", "website", "elapsed_ms"}
    assert payload["weakest"] == "The baseline is weak"
    assert payload["paper"] == "Some Paper"
    assert payload["role"] == "Same field"
    assert payload["website"] == ""
    assert isinstance(payload["elapsed_ms"], int) and payload["elapsed_ms"] >= 0
    # form was cleared after success
    assert page.input_value("#fb-weakest") == ""


def test_request_is_cors_simple(page, base_url):
    """text/plain avoids a preflight, which Apps Script cannot answer."""
    page.goto(f"{base_url}/feedback.html")
    page.evaluate("(u) => document.getElementById('feedback-form').dataset.endpoint = u", MOCK_ENDPOINT)
    headers = {}

    def handle(route):
        headers.update(route.request.headers)
        route.fulfill(body='{"ok":true}', content_type="application/json",
                      headers={"Access-Control-Allow-Origin": "*"})

    page.route(MOCK_ENDPOINT, handle)
    page.fill("#fb-weakest", "x")
    page.click("#fb-submit")
    page.wait_for_selector("#fb-status.success")
    assert headers["content-type"].startswith("text/plain")
    assert "cookie" not in headers


def test_server_error_is_shown_and_button_reenabled(page, base_url):
    page.goto(f"{base_url}/feedback.html")
    page.evaluate("(u) => document.getElementById('feedback-form').dataset.endpoint = u", MOCK_ENDPOINT)
    mock_backend(page, response={"ok": False, "error": "too_fast"})
    page.fill("#fb-weakest", "x")
    page.click("#fb-submit")
    page.wait_for_selector("#fb-status.error")
    assert "too quickly" in page.inner_text("#fb-status")
    assert page.is_enabled("#fb-submit")


def test_honeypot_is_not_visible(page, base_url):
    page.goto(f"{base_url}/feedback.html")
    box = page.locator("#fb-website").bounding_box()
    assert box is None or box["x"] < 0
