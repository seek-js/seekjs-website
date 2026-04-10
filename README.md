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

## License

MIT - free for personal and commercial use.
