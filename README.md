# talks

Slide decks for my talks, built with [reveal.js](https://revealjs.com) and published as a static
site on GitHub Pages: <https://omatheusmesmo.github.io/talks/>

## Structure

```
.
├── index.html          # navigable index of the talks (PT)
├── en.html             # navigable index of the talks (EN)
├── assets/
│   ├── site.css        # styling for the index pages
│   ├── talks.js        # TALKS registry (PT + EN) and list renderer, shared by both indexes
│   ├── deck.css        # shared theme for every deck
│   ├── qr-links.svg    # QR code for the closing slide
│   └── *.jpg           # speaker photos
├── demo/               # template: starting point for a new talk
│   ├── index.html      # PT
│   └── en.html         # EN
├── o-poder-do-foco/    # O Poder do Foco (Matheus Oliveira / Luiz Real)
│   ├── index.html      # PT
│   └── en.html         # EN
└── de-ze-ninguem-a-referencia/  # De Zé-Ninguém a Referência (Matheus Oliveira)
    ├── index.html      # PT
    └── en.html         # EN
```

Each talk is a folder holding two versions of the same deck: `index.html` (Portuguese, served at
`/<slug>/`) and `en.html` (English, at `/<slug>/en.html`). The footer of each deck switches between
the two. The home page is bilingual the same way: `index.html` (PT) and `en.html` (EN).

## Adding a new talk

1. `cp -r demo my-new-talk`
2. Edit `my-new-talk/index.html` (PT) and `my-new-talk/en.html` (EN).
3. Register the entry in the `TALKS` array in `assets/talks.js`, at the top of the list, with `title`
   and `summary` in both languages.

The theme lives in `assets/deck.css`, so a new deck inherits the same visual identity for free.

## Running locally

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Publishing to GitHub Pages

Settings → Pages → Source: **Deploy from a branch** → branch `main`, folder `/ (root)`.

The `.nojekyll` file disables Jekyll processing, which is not needed here.

## Shortcuts while presenting

| Key | Action |
| --- | --- |
| `→` / `←` | Navigate |
| `S` | Speaker notes |
| `F` | Fullscreen |
| `O` | Slide overview |
| `B` | Black screen (pause) |

## Offline mode

The decks load reveal.js from a CDN. To present without depending on the network:

```bash
npm pack reveal.js@5.1.0 && tar -xzf reveal.js-5.1.0.tgz
mv package vendor/reveal
```

Then swap the CDN URLs for `../vendor/reveal/dist/...` in the decks. The photos are already local.
