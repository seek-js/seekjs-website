"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../Accordion"

const faqs = [
  {
    question: "Is Seek.js free and open source?",
    answer:
      "Yes. Seek.js is MIT-licensed and fully open source. You can self-host the entire pipeline\u2014parser, compiler, client, and edge AI\u2014without any licensing fees or usage limits.",
  },
  {
    question: "Do I need a vector database?",
    answer:
      "No. Seek.js compiles your content into a static .msp index at build time that ships alongside your HTML on any CDN. There is no runtime database to provision, scale, or pay for.",
  },
  {
    question: "Which frameworks and runtimes are supported?",
    answer:
      "The build tools run on Node.js, Bun, and Deno. The client-side search works in any browser and ships framework integrations for React, Next.js, Vue, Svelte, Nuxt, Astro, Vite, Remix, and Solid.",
  },
  {
    question: "How large is the search index?",
    answer:
      "A typical documentation site produces an index around 600\u2009KB (Brotli-compressed). The index is cached in IndexedDB after the first load, so repeat visits pay zero transfer cost.",
  },
  {
    question: "Is the AI edge layer required?",
    answer:
      "No. @seekjs/ai-edge is optional. You can ship deterministic hybrid search (BM25 + vectors) that runs entirely in the browser with no server calls. Add the edge layer only when you want streamed, cited AI answers.",
  },
]

export function Faqs() {
  return (
    <section className="mt-20 sm:mt-36" aria-labelledby="faq-title">
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-14">
        <div className="col-span-full sm:col-span-5">
          <h2
            id="faq-title"
            className="inline-block scroll-my-24 bg-linear-to-br from-zinc-950 to-zinc-800 bg-clip-text py-2 pr-2 text-2xl font-bold tracking-tighter text-transparent lg:text-3xl dark:from-gray-50 dark:to-gray-300"
          >
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
            Can&rsquo;t find the answer you&rsquo;re looking for? Open an issue
            on{" "}
            <a
              href="https://github.com/seek-js"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              GitHub
            </a>
            .
          </p>
        </div>
        <div className="col-span-full mt-6 lg:col-span-7 lg:mt-0">
          <Accordion type="multiple" className="mx-auto">
            {faqs.map((item) => (
              <AccordionItem
                value={item.question}
                key={item.question}
                className="py-3 first:pb-3 first:pt-0"
              >
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
