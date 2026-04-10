const benefits = [
  {
    title: "Fully open source",
    description:
      "MIT-licensed from parser to edge runtime. Read the code, fork it, shape it to your needs.",
  },
  {
    title: "No vendor lock-in",
    description:
      "Ship a static index on any CDN. No proprietary APIs, no usage-based billing, no surprise invoices.",
  },
  {
    title: "Privacy first",
    description:
      "Search runs in the browser. User queries never leave the device unless you opt into the edge AI layer.",
  },
  {
    title: "Framework agnostic",
    description:
      "Works with React, Next.js, Vue, Svelte, Astro, Vite, Remix, Solid, and any static site generator.",
  },
  {
    title: "Build-time indexing",
    description:
      "Indexing happens once in CI, not on every request. Zero runtime compute cost for search.",
  },
  {
    title: "Instant search",
    description:
      "Hybrid BM25 + vector search powered by WASM returns results in under 15 ms in the browser.",
  },
  {
    title: "Tiny footprint",
    description:
      "A typical docs site produces a ~600 KB index. Cached in IndexedDB after the first visit.",
  },
  {
    title: "Optional edge AI",
    description:
      "Add streamed, cited AI answers via Cloudflare Workers AI only when you need them.",
  },
]

export default function Benefits() {
  return (
    <section aria-labelledby="benefits-title" className="mx-auto mt-44">
      <h2
        id="benefits-title"
        className="inline-block bg-linear-to-t from-zinc-950 to-zinc-800 bg-clip-text py-2 text-4xl font-bold tracking-tighter text-transparent md:text-5xl dark:from-gray-50 dark:to-gray-300"
      >
        Why Seek.js
      </h2>
      <dl className="mt-8 grid grid-cols-4 gap-x-10 gap-y-8 sm:mt-12 sm:gap-y-10">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="col-span-4 sm:col-span-2 lg:col-span-1">
            <dt className="font-semibold text-zinc-950 dark:text-gray-50">
              {benefit.title}
            </dt>
            <dd className="mt-2 leading-7 text-gray-600 dark:text-gray-400">
              {benefit.description}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
