"use client";

import type React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { RiCodeSSlashLine, RiShapesLine } from "@remixicon/react";
import Arrow from "../Arrow";

export default function CodeExampleTabs({
  tab1,
  tab2,
}: {
  tab1?: React.ReactNode;
  tab2?: React.ReactNode;
}) {
  return (
    <Tabs.Root
      className="mt-14 grid grid-cols-12 gap-8 overflow-visible md:items-stretch"
      defaultValue="tab1"
      orientation="vertical"
    >
      <Tabs.List
        className="col-span-full flex w-full flex-col gap-4 overflow-visible md:order-2 md:col-span-5 md:h-full md:min-h-0 md:gap-4"
        aria-label="Select code"
      >
        <Tabs.Trigger
          className="group relative flex min-h-0 flex-1 flex-col items-start justify-start overflow-visible rounded-xl p-4 text-left shadow-md shadow-zinc-400/20 ring-1 ring-zinc-200/60 sm:p-5 dark:shadow-zinc-800/30 dark:ring-zinc-700/30 dark:data-[state=active]:shadow-zinc-700/40"
          value="tab1"
        >
          <div
            className="pointer-events-none absolute -left-[36px] top-1/2 z-30 hidden -translate-y-1/2 -rotate-90 md:group-aria-selected:flex"
            aria-hidden
          >
            <Arrow width={18} height={8} />
          </div>
          <div className="flex items-center gap-4">
            <div className="aspect-square w-fit rounded-lg bg-white p-2 text-gray-700 ring-1 ring-zinc-200/60 transition-all group-data-[state=active]:text-zinc-700 group-data-[state=active]:shadow-md group-data-[state=active]:shadow-zinc-400/25 dark:bg-zinc-950 dark:text-gray-400 dark:ring-zinc-600/30 dark:group-data-[state=active]:text-zinc-300 dark:group-data-[state=active]:shadow-zinc-600/40">
              <RiShapesLine aria-hidden="true" className="size-5" />
            </div>
            <p className="font-semibold tracking-tight text-zinc-800 transition-all group-data-[state=active]:text-zinc-950 sm:text-lg dark:text-gray-300 dark:group-data-[state=active]:text-gray-100">
              Build: extract &amp; compile
            </p>
          </div>
          <p className="mt-3 leading-6 text-gray-700 dark:text-gray-300">
            Stream chunks from your static output, vectorize, and emit a
            compact .msp for hosting—no runtime crawl or vector DB.
          </p>
        </Tabs.Trigger>
        <Tabs.Trigger
          className="group relative flex min-h-0 flex-1 flex-col items-start justify-start overflow-visible rounded-xl p-4 text-left shadow-md shadow-zinc-400/20 ring-1 ring-zinc-200/60 sm:p-5 dark:shadow-zinc-800/30 dark:ring-zinc-700/30 dark:data-[state=active]:shadow-zinc-700/40"
          value="tab2"
        >
          <div
            className="pointer-events-none absolute -left-[36px] top-1/2 z-30 hidden -translate-y-1/2 -rotate-90 md:group-aria-selected:flex"
            aria-hidden
          >
            <Arrow width={18} height={8} />
          </div>
          <div className="flex items-center gap-4">
            <div className="aspect-square w-fit rounded-lg bg-white p-2 text-gray-700 ring-1 ring-zinc-200/60 transition-all group-data-[state=active]:text-zinc-700 group-data-[state=active]:shadow-md group-data-[state=active]:shadow-zinc-400/25 dark:bg-zinc-950 dark:text-gray-400 dark:ring-zinc-600/30 dark:group-data-[state=active]:text-zinc-300 dark:group-data-[state=active]:shadow-zinc-600/40">
              <RiCodeSSlashLine aria-hidden="true" className="size-5" />
            </div>
            <p className="font-semibold tracking-tight text-zinc-800 transition-all group-data-[state=active]:text-zinc-950 sm:text-lg dark:text-gray-300 dark:group-data-[state=active]:text-gray-100">
              Runtime: search &amp; AI
            </p>
          </div>
          <p className="mt-3 leading-6 text-gray-700 dark:text-gray-300">
            Hydrate the index in the browser, run hybrid search locally, then
            call the edge only when you need a streamed, cited answer.
          </p>
        </Tabs.Trigger>
      </Tabs.List>
      <div className="col-span-full flex min-h-0 flex-col overflow-visible md:col-span-7 md:h-96">
        <Tabs.Content
          value="tab1"
          className="flex min-h-0 flex-1 flex-col outline-none data-[state=inactive]:hidden"
        >
          {tab1}
        </Tabs.Content>
        <Tabs.Content
          value="tab2"
          className="flex min-h-0 flex-1 flex-col outline-none data-[state=inactive]:hidden"
        >
          {tab2}
        </Tabs.Content>
      </div>
    </Tabs.Root>
  );
}
