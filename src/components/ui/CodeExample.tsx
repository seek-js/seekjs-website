import Code from "@/components/Code";
import {
  RiAiGenerate,
  RiArchive2Line,
  RiHtml5Line,
  RiSearchLine,
} from "@remixicon/react";
import { Badge } from "../Badge";
import CodeExampleTabs from "./CodeExampleTabs";

const codeBuild = `import { extractHtml } from "@seekjs/parser";

const stream = extractHtml({
  inputDir: "./dist",
  urlBase: "https://yoursite.com",
  selectors: ["article", "main"],
});

for await (const batch of stream) {
  // batch: { text, url, hash }[]
  await compiler.push(batch);
}`;

const codeRuntime = `import { useAiSearch } from "@seekjs/react";

export function DocSearch() {
  const { search, results, status } = useAiSearch({
    indexUrl: "/search_index.msp",
    storageStrategy: "indexedDB",
  });

  return (
    <input
      onMouseEnter={() => search.preload()}
      onChange={(e) => search.execute(e.target.value)}
    />
  );
}`;

const features = [
  {
    name: "Parse at build time",
    description:
      "Extract semantic chunks from your generated site and bind them to source URLs.",
    icon: RiHtml5Line,
  },
  {
    name: "Compile to .msp",
    description:
      "Vectorize chunks and serialize a compact index for CDN delivery.",
    icon: RiArchive2Line,
  },
  {
    name: "Search in the browser",
    description: "Cache the index in IndexedDB and run hybrid search locally.",
    icon: RiSearchLine,
  },
  {
    name: "Stream edge summaries",
    description:
      "Send top chunks to the edge only when an AI answer is requested.",
    icon: RiAiGenerate,
  },
];

export default function CodeExample() {
  return (
    <section
      aria-labelledby="code-example-title"
      className="mx-auto w-full max-w-6xl px-3"
    >
      <Badge>Pipeline</Badge>
      <h2
        id="code-example-title"
        className="text-metallic mt-2 inline-block py-2 text-4xl font-bold tracking-tighter sm:text-6xl md:text-6xl"
      >
        The Seek.js pipeline, <br /> from source to answer
      </h2>
      <p className="mt-6 max-w-2xl text-lg text-zinc-950 dark:text-gray-100">
        Build-time extraction, binary index generation, browser-side search, and
        edge inference stay separate so each layer stays cheap and fast.
      </p>
      <CodeExampleTabs
        tab1={
          <Code
            code={codeBuild}
            lang="typescript"
            copy={false}
            className="h-96"
          />
        }
        tab2={
          <Code
            code={codeRuntime}
            lang="tsx"
            copy={false}
            className="h-96"
          />
        }
      />
      <dl className="mt-16 grid grid-cols-4 gap-6">
        {features.map((item) => (
          <div
            key={item.name}
            className="col-span-full rounded-xl border border-zinc-200/60 bg-white/80 p-6 shadow-sm shadow-zinc-400/12 sm:col-span-2 lg:col-span-1 dark:border-zinc-700/40 dark:bg-zinc-950/50 dark:shadow-zinc-950/20"
          >
            <div className="w-fit rounded-lg p-2 shadow-[0_6px_12px_-4px_rgba(120,122,132,0.32)] ring-1 ring-zinc-300/35 dark:shadow-[0_8px_16px_-4px_rgba(150,152,165,0.34)] dark:ring-zinc-500/25">
              <item.icon
                aria-hidden="true"
                className="size-6 text-zinc-600 drop-shadow-[0_4px_2px_rgba(96,98,108,0.38)] dark:text-zinc-400 dark:drop-shadow-[0_5px_3px_rgba(176,178,192,0.42)]"
              />
            </div>
            <dt className="mt-5 font-semibold text-zinc-950 dark:text-gray-50">
              {item.name}
            </dt>
            <dd className="mt-2 leading-7 text-gray-700 dark:text-gray-300">
              {item.description}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
