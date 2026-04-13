import { siteConfig } from "@/app/siteConfig";
import { RiGithubFill } from "@remixicon/react";
import Link from "next/link";
import HeroImage from "./HeroImage";
import { MetalPrimaryButton } from "./MetalPrimaryButton";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto mt-28 flex w-full max-w-6xl flex-col items-center justify-center px-4 text-center sm:mt-40"
    >
      <h1
        id="hero-title"
        className="text-metallic mx-auto w-full max-w-5xl animate-slide-up-fade px-2 py-2 text-center text-4xl font-bold tracking-tight text-balance sm:text-6xl sm:tracking-tighter md:text-7xl"
        style={{ animationDuration: "700ms" }}
      >
        Disaggregated AI search for modern applications
      </h1>
      <p
        className="mx-auto mt-6 w-full max-w-lg animate-slide-up-fade text-center text-lg text-pretty text-zinc-950 dark:text-gray-100"
        style={{ animationDuration: "900ms" }}
      >
        Seek.js shifts indexing to build-time, search to the browser, and
        reasoning to the edge so teams can ship AI search without the vector
        database tax.
      </p>
      <div
        className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-slide-up-fade"
        style={{ animationDuration: "1100ms" }}
      >
        <MetalPrimaryButton asChild>
          <Link href="/docs">Read the docs</Link>
        </MetalPrimaryButton>
        <MetalPrimaryButton asChild>
          <Link
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
          >
            <RiGithubFill className="size-4 shrink-0" aria-hidden />
            GitHub
          </Link>
        </MetalPrimaryButton>
      </div>
      <div
        className="relative mx-auto mt-12 h-fit w-full max-w-6xl animate-slide-up-fade px-2 sm:mt-20"
        style={{ animationDuration: "1400ms" }}
      >
        <HeroImage />
        <div
          className="absolute inset-x-0 -bottom-20 -mx-10 h-2/4 bg-linear-to-t from-white via-white to-transparent lg:h-1/4 dark:from-zinc-950 dark:via-zinc-950"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
