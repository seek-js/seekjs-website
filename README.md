# Seek.js - Disaggregated AI Search Framework

> Eliminate the "Vector Database Tax" with build-time indexing, browser-side search, and edge AI summaries.

## Overview

Seek.js is an open-source framework that completely eliminates the cost and complexity of adding AI search to documentation and product catalogs.

### The Problem

In 2026, adding generative AI search (RAG) to a website forces developers to:

- Provision expensive managed vector databases ($500+/mo)
- Write fragile web-scraping ingestion scripts
- Pay heavy LLM inference costs for every keystroke

We call this the **"Vector Database Tax."**

### The Solution

Seek.js disaggregates the RAG pipeline:

1. **Build-Time Indexing** - Hook into Next.js/Astro/Vite, extract text with WASM, vectorize, compile to `.msp` binary
2. **Browser-Side Search** - CDN delivers the index, browser caches in IndexedDB, runs hybrid search locally (<15ms)
3. **Edge Reasoning** - Only invoke server compute for AI summaries via Cloudflare Workers AI

## Quick Start

```bash
bun install
bun run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Core Modules

| Module             | Purpose                         |
| ------------------ | ------------------------------- |
| `@seekjs/parser`   | Extract semantic text from HTML |
| `@seekjs/compiler` | Vectorize & compile to `.msp`   |
| `@seekjs/client`   | Browser-based hybrid search     |
| `@seekjs/ai-edge`  | Edge LLM streaming responses    |

## Tech Stack

- Next.js 16 + React 19
- Fumadocs (MDX documentation)
- Tailwind CSS 4
- Radix UI
- Shiki (syntax highlighting)

## Deploy to GitHub Pages

This site uses Next.js **static export** (`output: "export"` in [`next.config.mjs`](next.config.mjs)). There is no Node server on Pages; `next start` does not apply. Serve the `out/` folder locally to smoke-test:

```bash
bun run build
npx serve out
```

**CI:** Enable **Settings → Pages → Source: GitHub Actions**. Pushes to **`main`** run [`.github/workflows/deploy-github-pages.yml`](.github/workflows/deploy-github-pages.yml) (`bun run build`, deploy `out/`). You can also trigger a deploy from **Actions → Run workflow**.

### Base path (`/<repo>`)

For a **project** site at `https://<user>.github.io/<repo>/`, the workflow sets `GITHUB_PAGES_BASE_PATH=/<repo>` so assets and `/docs` links resolve correctly (see also [`src/lib/source.ts`](src/lib/source.ts)).

For a **user or organization** site where the repository is named `<user>.github.io` (site at `https://<user>.github.io/`), edit the workflow’s “Build static site” step and set `GITHUB_PAGES_BASE_PATH: ""` (empty string) instead of `/${{ github.event.repository.name }}`.

### Local build with a base path

```bash
GITHUB_PAGES_BASE_PATH=/my-repo bun run build
npx serve out
```

## License

MIT - free for personal and commercial use.
