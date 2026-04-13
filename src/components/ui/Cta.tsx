"use client";

import { siteConfig } from "@/app/siteConfig";
import Balancer from "react-wrap-balancer";
import { RiDiscordFill, RiGithubFill } from "@remixicon/react";
import Link from "next/link";
import { MetalPrimaryButton } from "./MetalPrimaryButton";

export default function Cta() {
  return (
    <section
      aria-labelledby="cta-title"
      className="mx-auto w-full max-w-6xl px-3 pb-20 md:pb-28"
    >
      <div className="relative flex items-center justify-center">
        <div
          className="cta-grid-bg mask pointer-events-none absolute inset-0 -z-10 select-none opacity-60 sm:opacity-70"
          aria-hidden="true"
        >
          <div className="h-full w-full" />
        </div>
        <div className="max-w-4xl">
          <div className="flex flex-col items-center justify-center text-center">
            <h3
              id="cta-title"
              className="text-metallic inline-block p-2 text-4xl font-bold tracking-tighter md:text-6xl"
            >
              Contribute to Seek.js
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-950 sm:text-lg dark:text-gray-100">
              <Balancer>
                Issues, design feedback, and docs PRs welcome on GitHub; chat
                with contributors on Discord.
              </Balancer>
            </p>
            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <MetalPrimaryButton className="w-full sm:w-auto" asChild>
                <Link
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2 px-5 no-underline"
                >
                  <RiGithubFill
                    className="size-5 shrink-0 text-zinc-800 dark:text-zinc-200"
                    aria-hidden
                  />
                  GitHub
                </Link>
              </MetalPrimaryButton>
              <MetalPrimaryButton className="w-full sm:w-auto" asChild>
                <Link
                  href={siteConfig.social.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2 px-5 no-underline"
                >
                  <RiDiscordFill
                    className="size-5 shrink-0 text-zinc-800 dark:text-zinc-200"
                    aria-hidden
                  />
                  Discord
                </Link>
              </MetalPrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
