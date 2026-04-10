import { siteConfig } from "@/app/siteConfig";
import { RiArrowRightUpLine } from "@remixicon/react";
import Link from "next/link";
import { BrandWordmark } from "../BrandWordmark";
import ThemeSwitch from "../ThemeSwitch";

const links = [
  { name: "Docs", href: "/docs", external: false },
  { name: "Changelog", href: "/changelog", external: false },
  {
    name: "GitHub",
    href: siteConfig.social.github,
    external: true,
  },
  {
    name: "Discord",
    href: siteConfig.social.discord,
    external: true,
  },
] as const;

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-zinc-200/60 dark:border-zinc-700/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-3 py-10 sm:flex-row sm:items-center sm:justify-between sm:py-8">
        <Link href="/" aria-label="Home">
          <BrandWordmark className="text-xl" />
        </Link>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((item) => (
              <li key={item.name}>
                <Link
                  className="inline-flex items-center gap-1 text-sm text-gray-500 transition hover:text-zinc-950 dark:text-gray-400 dark:hover:text-gray-50"
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  {item.name}
                  {item.external && (
                    <RiArrowRightUpLine
                      aria-hidden
                      className="size-3.5 opacity-60"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeSwitch />
          <span className="text-xs text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
