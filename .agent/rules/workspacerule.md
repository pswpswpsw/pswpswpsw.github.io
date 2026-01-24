---
trigger: always_on
---

# Project Rules and Overview

Generated from conversation analysis on: 2026-01-21

## 1. Project Identity
- **Subject**: Academic Personal Website of **Prof. Shaowu Pan** (Rensselaer Polytechnic Institute, CSML Lab).
- **Type**: Static Portfolio Website.

## 2. Technology Stack
- **Languages**: HTML5, CSS3, JavaScript.
- **Frameworks/Libraries**:
  - **CSS**: Bootstrap (located in `utils/`), Custom CSS (`utils/css_layout.css`).
  - **JS**: jQuery (located in `utils/`).
- **Hosting**: GitHub Pages (inferred from `.github` directory and `pswpswpsw.github.io` naming).

## 3. Directory Structure Standards
- **HTML Pages**: Located in the root directory (e.g., `index.html`, `projects.html`, `members.html`).
- **Assets**: All images and static media must be stored in the `resources/` directory or its subdirectories (e.g., `resources/publication_images/`).
- **Utilities**: External libraries and shared styles are kept in `utils/`.

## 4. Key Contextual Insights
- The website showcases research, publications, teaching, and lab members.
- The `index.html` file serves as the main biography and news hub.
- **File Naming**: The repository contains a significant number of image files (PNGs) in `resources/`.

## 5. CSS and Design Standards

### CSS Architecture
- **Centralized Styling**: Shared component styles must be centralized in `utils/css_layout.css` (e.g., the `.github_outside` class for GitHub embeddings).
- **Specificity Management**: Use `#main > div.content [element]` when overriding global styles for the main content area to ensure they take precedence over layout defaults.

### Typography
- **Bold Text**: Use `font-weight: 500` for bold text in components like Advice summaries. The main content area generally uses standard weights but can be overridden as needed.
- **Navigation (Sidebar)**: Menu items (`.nav_item`) use `font-weight: 600` and `letter-spacing: 0px`.
- **Publications**: Author names in publication lists should not be italicized.

### List Styling & Alignment
- **Positioning**: Use `list-style-position: outside` for all standard lists to ensure bullets don't wrap strangely with block content.
- **Indentation (Main Content)**: 
    - Bulleted lists (`ul`): `margin-left: 1.5em`.
    - Ordered lists (`ol`): `margin-left: 0em` (specifically for publications and numbered lists).
    - Lists with hidden markers (e.g., `list-style-type: none`): `margin-left: 0`.
- **Advice/Details Lists**: For nested lists with `<details>` and `<summary>` (as seen in `letter.html`), use the `.advice-list` class. 
    - `li` elements have `margin-left: 25px`.
    - `summary` elements have `font-weight: 500`.
- **Summary Styling**: Do not put block-level tags like `<h1>` inside `<summary>`; style the `<summary>` directly in CSS to avoid unwanted newlines after bullets.

### Component Specifics
- **GitHub Embeddings**: Use `<div class="github_outside">` to wrap GitHub README embeddings. These are styled with `font-weight: 450`, `font-size: 1em`, and `line-height: 1.7`.