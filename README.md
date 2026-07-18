# Shreesha's Birthday Site 🎂

A three-page Next.js (App Router) birthday site: a home page with an
interactive wish message, and two responsive photo galleries.

## 1. Add your photos

Drop your 20 childhood photos into `public/childhood/` named:

```
img1.jpg  img2.jpg  img3.jpg ... img20.jpg
```

and your 20 adulthood photos into `public/adulthood/` the same way:

```
img1.jpg  img2.jpg ... img20.jpg
```

If your files are `.png` or `.jpeg` instead of `.jpg`, open
`app/childhood/page.js` and `app/adulthood/page.js` and change the
extension in the `src` template string on the `images` array.

(Photos don't have to be perfectly square or the same size — the
gallery is a masonry-style grid that handles mixed aspect ratios.)

## 2. Install and run locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000 — Home, Childhood, and Adulthood are all
linked from the navbar.

## 3. Deploy to Vercel

The easiest path:

```bash
npm install -g vercel
vercel
```

Follow the prompts (link/create a project, accept the defaults — it
auto-detects Next.js). Or push this folder to a GitHub repo and import
it at https://vercel.com/new — Vercel will build and deploy it
automatically on every push.

## Project structure

```
birthday-site/
├── app/
│   ├── page.js              → Home page (birthday wish + interactive cake)
│   ├── childhood/page.js    → Childhood gallery
│   ├── adulthood/page.js    → Adulthood gallery
│   ├── layout.js            → Shared layout: fonts, navbar, starfield background
│   └── globals.css
├── components/
│   ├── Navbar.js
│   ├── StarField.js         → animated night-sky canvas used site-wide
│   ├── Gallery.js           → responsive grid + lightbox
│   └── Card.js
├── public/
│   ├── childhood/           → put img1.jpg ... img20.jpg here
│   ├── adulthood/           → put img1.jpg ... img20.jpg here
│   └── music/                → optional background music file
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
├── jsconfig.json
└── package.json
```

## Notes

- The cake on the home page is interactive: tap each candle to blow it
  out; blowing out the last one triggers a confetti burst.
- The wish jar lets a visitor type a message and release it as a
  floating lantern (purely visual, nothing is saved/sent anywhere).
- `public/music/` is there if you want to add background music later —
  it isn't wired up yet, just reserved space.
