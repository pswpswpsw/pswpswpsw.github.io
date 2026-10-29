# Blog

The blog index is `blog.html`. Its text, headings, and the rest of the website
use Spectral, the serif font, with Georgia as a fallback.
Spectral loads through Google Fonts. The blog is ordinary
static HTML and needs no build step or JavaScript.

## Add a post

1. Copy `utils/blog-post-template.html.txt` into the website root and give it
   an HTML filename, for example `blog-learning-dynamics.html`.
2. Replace every `POST_TITLE`, `POST_DESCRIPTION`, `YYYY-MM-DD`, and
   `MONTH DAY, YEAR` placeholder. Use an ISO date such as `2026-10-16` for
   `datetime` and a readable date such as `October 16, 2026` for the text.
   Write the article inside `<article class="blog-article">`. Escape special
   characters in HTML: `&amp;`, `&lt;`, `&gt;`, and `&quot;`.
3. Put figures under `resources/blog/` and include descriptive `alt` text.
   Images, code blocks, and numbered lists have scoped article styles.
   Mathematical typesetting is not configured yet; add a math renderer when
   a post requires it.
4. In `blog.html`, replace the `blog-empty` paragraph with the list below.
   Fill in the real filename, title, date, and excerpt. When the list already
   exists, add each new `<li>` at the top so the newest post appears first.

```html
<ul class="blog-index" aria-label="Blog posts">
  <li>
    <article>
      <h2 class="blog-post-title">
        <a href="./blog-learning-dynamics.html">Post title</a>
      </h2>
      <p class="blog-date"><time datetime="2026-10-16">October 16, 2026</time></p>
      <p class="blog-excerpt">A short summary of the post.</p>
    </article>
  </li>
</ul>
```

## Preview and publish

Open `blog.html` directly in a browser, or serve this directory locally:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Then visit `http://127.0.0.1:8000/blog.html`. Check the title, date, links,
and article on a narrow screen before publishing. The existing GitHub Pages
workflow publishes the site when changes are pushed to `master`.

The template is stored as `.html.txt` so it does not appear as a sample post.
Create a copy in the website root before previewing a new article. Posts link
back to the index through both the sidebar and the “All blog posts” link.
