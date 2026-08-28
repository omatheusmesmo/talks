# AGENTS.md

Guidance for AI coding agents working in this repository.

## What this is

A static site of reveal.js slide decks, published on GitHub Pages. There is **no build step, no
package manager, no test suite, and no dependencies to install**. Every file is served exactly as it
sits in the repo. Do not add a bundler, a `package.json`, or a framework unless explicitly asked.

## Commands

```bash
python3 -m http.server 8000        # serve the site locally at http://localhost:8000
```

There are no lint or test commands. The verification loop for this repo is **visual**: render a
slide headless and look at it.

```bash
# screenshot one slide (reveal uses #/<zero-based-index> for slide navigation)
chromium --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
  --window-size=1400,840 --virtual-time-budget=6000 \
  --screenshot=/tmp/slide.png "http://localhost:8000/o-poder-do-foco/#/5"
```

Always screenshot after changing `assets/deck.css` or slide markup. Layout bugs in this codebase
(content overflowing the slide box, decorative frames colliding with text) are invisible when
reading the CSS and obvious in a render.

## Architecture

### The theme is the contract

`assets/deck.css` owns all visual design. A deck's `index.html` is **pure composition**: it declares
`<section>` elements and applies predefined classes. Never write per-deck CSS inside a deck file. If
a talk needs a new layout, add a reusable class to `deck.css` so every future deck inherits it.

The class vocabulary a deck composes from:

| Class | Applies to | Purpose |
| --- | --- | --- |
| `.kicker` | div, first child of a section | mono label plus the rule that runs to the right edge |
| `.cover` | section | oversized `h1`, enables the `.byline` block |
| `.person` | div | speaker slide: `.avatar` (with nested `img` + `.handle`) and a `ul` of credentials |
| `.answer` | section | one huge word in `h1` plus a `.sub` thesis line |
| `.question` | section | the turning-point question, with a giant `.mark-q` glyph |
| `.qa` | section | numbered `ol` of questions for the Q&A session |
| `.duo` | div | two-column comparison, each column a `.col` with `h3` + `ul` |
| `.takeaways` | div | three-card grid, each card a `.card` with `.num` + `h3` + `p` |
| `.bonus` | section | closing slide, uses `.steps` for the mono pipeline chips |
| `.sub` / `.lede` | p | muted supporting line / larger emphasis line |
| `.fragment.fade-up` | any | reveal-on-click, custom easing defined in `deck.css` |
| `<em>` | inline | paints a span in the amber accent, used inside every `h1` / `h2` |

### Slide geometry

Every deck calls `Reveal.initialize` with `width: 1280, height: 720`, so all sizing in `deck.css`
is in that fixed coordinate space, not viewport units. Reveal scales the whole thing to fit.
Sections carry `box-sizing: border-box` with `padding: 0 96px`; removing that box-sizing makes every
slide overflow horizontally.

Keep the `Reveal.initialize` config identical across decks so slide numbering, transitions, and the
notes plugin behave the same everywhere.

### The full-bleed accent tint

`.question` and `.bonus` sections deliberately have **no background of their own**. The amber wash is
painted by `.reveal-viewport::before` and switched on with
`:has(section.present.question)` / `:has(section.present.bonus)`. A background set on the section
itself only fills the 1280x720 slide box and shows visible edges against the viewport.

### Bilingual decks

Each talk folder holds the same deck twice: `index.html` (Portuguese, served at `/<slug>/`) and
`en.html` (English, at `/<slug>/en.html`). They must stay structurally identical, same sections in
the same order, differing only in text. The `.lang` block in `.deck-footer` cross-links them, with
the current language as `<b>` and the other as `<a>`.

When editing slide content, **change both files in the same pass**. A change landing in only one
language is the most likely regression in this repo.

### The talk index

`index.html` renders the talk list from a `TALKS` array declared inline in a `<script>` block, not
fetched from a JSON file. That is deliberate: it keeps the index working over `file://` with no
server. Each entry needs `slug`, `date`, `title`, `summary`, `speakers`, and optionally `tag`. The
renderer builds `/<slug>/` and `/<slug>/en.html` links from the slug, so the folder name and slug
must match.

### Adding a talk

1. `cp -r demo my-new-talk`
2. Edit both `index.html` and `en.html` inside it.
3. Prepend an entry to the `TALKS` array in the root `index.html`.

`demo/` is the canonical template and doubles as the POC that navigation works. Keep it in sync with
the class vocabulary: when you add a layout to `deck.css`, demonstrate it in `demo/`.

### Deployment

GitHub Pages serves `main` at `/ (root)`. `.nojekyll` disables Jekyll processing. A push republishes;
there is no workflow file and none is needed.

## Content conventions

- **No em dashes or en dashes** anywhere in prose, in any language. Use commas, colons, parentheses,
  or restructure the sentence. This applies to slide copy, the README, and commit messages.
- Portuguese decks keep technical terms in English (pull request, review, meetup, CFP).
- Every slide carries an `<aside class="notes">` with speaker guidance and timing. Preserve and
  update these when editing a slide; they are part of the deliverable, not scaffolding.
- Slides are deliberately sparse. Resist adding bullet points to a slide that has one line on it.

## External dependencies

Decks load reveal.js 5.1.0 from jsDelivr and fonts from Google Fonts. Speaker photos are local in
`assets/`. See the README for how to vendor reveal.js when presenting offline.
