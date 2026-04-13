"use client";

import { siteConfig } from "@/app/siteConfig";
import useScroll from "@/lib/use-scroll";
import { cx } from "@/lib/utils";
import { RiCloseLine, RiMenuLine } from "@remixicon/react";
import Link from "next/link";
import React from "react";
import { BrandWordmark } from "../BrandWordmark";
import { Button } from "../Button";
import { MetalPrimaryButton } from "./MetalPrimaryButton";

export function Navigation() {
  const scrolled = useScroll(15);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery: MediaQueryList = window.matchMedia("(min-width: 768px)");
    const handleMediaQueryChange = () => {
      setOpen(false);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    handleMediaQueryChange();

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <header
      className={cx(
        "fixed inset-x-3 top-4 z-50 mx-auto flex max-w-6xl transform-gpu animate-slide-down-fade justify-center overflow-hidden rounded-xl border border-transparent px-3 py-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1.03)] will-change-transform",
        open === true ? "h-52" : "h-16",
        scrolled || open === true
          ? "backdrop-blur-nav max-w-3xl border-zinc-200/50 bg-white/80 dark:border-zinc-700/30 dark:bg-zinc-950/75"
          : "bg-white/0 dark:bg-zinc-950/0",
      )}
    >
      <div className="w-full md:my-auto">
        <div className="relative flex items-center justify-between gap-4">
          <Link
            href={siteConfig.baseLinks.home}
            className="flex shrink-0 items-center"
            aria-label="Home"
          >
            <BrandWordmark className="text-xl md:text-2xl" />
          </Link>
          <div className="hidden items-center gap-10 md:flex">
            <nav aria-label="Main">
              <ul className="flex items-center gap-8 font-medium">
                <li>
                  <Link
                    className="inline-block rounded-md px-2 py-1 text-zinc-950 dark:text-gray-50"
                    href="/docs"
                  >
                    Docs
                  </Link>
                </li>
                <li>
                  <Link
                    className="inline-block rounded-md px-2 py-1 text-zinc-950 dark:text-gray-50"
                    href={siteConfig.baseLinks.changelog}
                  >
                    Changelog
                  </Link>
                </li>
              </ul>
            </nav>
            <MetalPrimaryButton className="shrink-0" asChild>
              <Link href="/docs">Get Started</Link>
            </MetalPrimaryButton>
          </div>
          <div className="flex gap-x-2 md:hidden">
            <MetalPrimaryButton className="px-3" asChild>
              <Link href="/docs">Get Started</Link>
            </MetalPrimaryButton>
            <Button
              onClick={() => setOpen(!open)}
              variant="light"
              className="aspect-square p-2"
            >
              {open ? (
                <RiCloseLine aria-hidden="true" className="size-5" />
              ) : (
                <RiMenuLine aria-hidden="true" className="size-5" />
              )}
            </Button>
          </div>
        </div>
        <nav
          className={cx(
            "my-5 flex text-lg ease-in-out will-change-transform md:hidden",
            open ? "" : "hidden",
          )}
        >
          <ul className="space-y-4 font-medium">
            <li>
              <Link
                href="/docs"
                onClick={() => setOpen(false)}
                className="inline-flex w-full rounded-lg px-2 py-1.5 text-zinc-950 dark:text-gray-50"
              >
                Docs
              </Link>
            </li>
            <li>
              <Link
                href={siteConfig.baseLinks.changelog}
                onClick={() => setOpen(false)}
                className="inline-flex w-full rounded-lg px-2 py-1.5 text-zinc-950 dark:text-gray-50"
              >
                Changelog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
