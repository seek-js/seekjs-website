import React from "react";
import { Badge } from "../Badge";

const stats = [
  {
    name: "Runtime databases",
    value: "Zero",
  },
  {
    name: "In-browser search",
    value: "<15 ms",
  },
  {
    name: "Static index shipped",
    value: "~600 KB",
  },
];

export default function Features() {
  return (
    <section
      aria-labelledby="features-title"
      className="mx-auto w-full max-w-6xl px-3"
    >
      <Badge>Why Seek.js</Badge>
      <h2
        id="features-title"
        className="text-metallic mt-2 inline-block py-2 text-4xl font-bold tracking-tighter sm:text-6xl md:text-6xl"
      >
        Built to remove the vector database tax
      </h2>
      <p className="mt-6 max-w-3xl text-lg leading-7 text-zinc-950 dark:text-gray-100">
        Seek.js disaggregates the RAG pipeline into parser, compiler, client,
        and edge reasoning modules so docs and product search stay fast,
        portable, and cheap to run.
      </p>
      <dl className="mt-12 grid grid-cols-1 gap-y-8 md:grid-cols-3 md:border-y md:border-zinc-200/60 md:py-14 dark:border-zinc-700/50">
        {stats.map((stat) => (
          <React.Fragment key={stat.name}>
            <div className="border-l-2 border-zinc-300/60 pl-6 md:border-l md:text-center lg:border-zinc-300/50 lg:first:border-none dark:border-zinc-600/50 lg:dark:border-zinc-600/40">
              <dd className="text-metallic inline-block text-5xl font-bold tracking-tight lg:text-6xl">
                {stat.value}
              </dd>
              <dt className="mt-1 text-gray-700 dark:text-gray-300">
                {stat.name}
              </dt>
            </div>
          </React.Fragment>
        ))}
      </dl>
    </section>
  );
}
