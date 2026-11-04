# Reconix website

The public landing page and documentation for **Reconix** — an AI-powered terminal assistant that plans
authorized security assessments, keeps every action inside an approved scope, and turns tool results into
clear findings and reports.

This repository contains only the website. It ships no assessment capability of its own.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, React 19, `output: "standalone"`) |
| Language | TypeScript |
| Styling | Tailwind CSS v4, shadcn-style components, CSS custom-property design tokens |
| Motion | GSAP + ScrollTrigger, Lenis smooth scrolling |
| Icons / type art | `lucide-react`, `simple-icons`, `figlet` (server-rendered ASCII banners) |

No database, no API routes, no client-side data fetching: every page is prerendered at build time.

## Quick start

Requires Node.js 20 or later (the Docker image uses 22).

```bash
npm install
npm run dev
# open http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build; prerenders every route |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (`eslint-config-next`) |

## Configuration

`SITE_URL` is the only environment variable. It is read at **build time** and baked into the page metadata,
the Open Graph share image, `sitemap.xml` and `robots.txt`, so it must be set when you build, not when you run.

```bash
SITE_URL=https://reconix.example.com npm run build
```

Everything else lives in [`src/lib/site.ts`](src/lib/site.ts) as plain constants: the site name, tagline,
description, the GitHub repository link (`SITE_REPO_URL`) and `SITE_OPEN_SOURCE`, which switches the footer's
copyright line once the tool repository is public.

## Deploy with Docker

```bash
SITE_URL=https://reconix.example.com docker compose up -d --build
# serves on http://localhost:8080
```

The multi-stage [`Dockerfile`](Dockerfile) builds the standalone output and runs it on Node 22 Alpine, listening
on port 3000 inside the container. [`next.config.ts`](next.config.ts) sets baseline security headers
(`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`) and disables the
`X-Powered-By` header. A full Content-Security-Policy is deliberately left to a proxy or middleware, since
Next's inline scripts need per-request nonces.

## Project structure

```
src/
├─ app/
│  ├─ page.tsx              landing page, assembled from components/sections/
│  ├─ docs/                 documentation routes (one dynamic route per group and page)
│  ├─ globals.css           colour and font tokens, hero effects, section backdrops
│  ├─ opengraph-image.tsx   generated share image
│  └─ robots.ts, sitemap.ts
├─ components/
│  ├─ sections/             the landing page's sections, one file each
│  ├─ ui/                   shadcn-style Button, Card, Badge, StatusChip
│  ├─ docs-layout.tsx       docs shell: sidebar, breadcrumbs, TOC, prev/next, Callout, Code
│  └─ …                     navigation, footer, canvas and motion pieces
├─ content/docs/            the documentation prose, one file per group
└─ lib/
   ├─ docs-nav.ts           the docs tree: groups, pages, order, breadcrumbs, prev/next
   ├─ site.ts               site-wide constants
   ├─ node-graph.js         framework-free canvas node map (keep it import-free)
   └─ dot-field.ts          cursor-reactive dot grid
```

### Notable pieces

- **`components/section-shell.tsx`** — section wrapper with a themed backdrop (`grid`, `dots`, `hazard`,
  `scanlines`, `glow`) and an ambient `tint`.
- **`components/scroll-ambient.tsx`** — fixed glow behind the landing page that crossfades to each section's
  tint as you scroll.
- **`components/sections/showcase.tsx`** — pinned feature showcase: one node map whose camera pans and zooms
  between hubs on scroll, with the copy alternating sides.
- **`components/ascii-banner.tsx`** — figlet banners, server-rendered: "ANSI Shadow" for section titles,
  "Pagga" for the hero wordmark. `ascii-art.tsx` is the figlet-free renderer.
- **`components/reveal.tsx`** and **`components/smooth-scroll.tsx`** — GSAP ScrollTrigger reveals and Lenis
  smooth scrolling, wired together.

## Editing the documentation

The docs are two files per change, never more:

1. **Structure** — add the page to its group's `pages` array in [`src/lib/docs-nav.ts`](src/lib/docs-nav.ts).
   That single list drives the sidebar, breadcrumbs, prev/next links, the group cards and `generateStaticParams`.
2. **Content** — add an entry under the same `group`/`slug` key in [`src/content/docs/`](src/content/docs/),
   shaped as `{ lede, body }` (see [`types.ts`](src/content/docs/types.ts)).

A route with no content entry 404s by design; `dynamicParams` is `false`, so nothing outside `DOCS_NAV` exists.

Inside a page body, compose with the helpers from `components/docs-layout.tsx`: `DocSection` (its title becomes
the "On this page" anchor), `Code` (which carries its own copy-to-clipboard button), `Mono`, `DocLink` and
`Callout` (`note`, `warning` or `draft`).

Two per-page flags are available in a content entry:

- `draft: true` — shows the grey "Draft: content pending" callout.
- `notice: "…"` — shows the amber review-status notice above the content, for pages whose details are still
  being confirmed. `DocumentationNotice` with a `title` renders the larger banner used on the docs overview.

## Status

The documentation is written against Reconix as it currently stands and is still being reviewed; pages whose
details may change carry the amber notice described above. Treat the installation commands, configuration paths
and reference details as preliminary until the tool's first public release.
