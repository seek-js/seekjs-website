import { cx } from "@/lib/utils";
import type { BundledLanguage, BundledTheme } from "shiki";
import { codeToHtml } from "shiki";
import CopyToClipboard from "./CopyToClipboard";

type Props = {
  code: string;
  lang?: BundledLanguage;
  theme?: BundledTheme;
  filename?: string;
  copy?: boolean;
  className?: string;
};

export default async function Code({
  code,
  lang = "typescript",
  copy = false,
  // tokyo-night
  // catppuccin-macchiato
  // min-dark
  // poimandres
  theme = "github-dark",
  className,
}: Props) {
  const htmlDark = await codeToHtml(code, {
    lang,
    theme,
  });
  const htmlLight = await codeToHtml(code, {
    lang,
    theme: "github-light",
  });

  return (
    <div
      className={cx(
        "relative w-full overflow-auto rounded-xl bg-zinc-100 shadow-xl shadow-zinc-400/15 ring-1 ring-zinc-300/35 dark:bg-zinc-950 dark:shadow-zinc-800/30 dark:ring-zinc-700/20",
        className,
      )}
    >
      {copy && (
        <div className="absolute right-0 h-full w-24 bg-gradient-to-r from-zinc-100/0 via-zinc-100/80 to-zinc-100 dark:from-zinc-950/0 dark:via-zinc-950/70 dark:to-zinc-950">
          <div className="absolute right-3 top-3">
            <CopyToClipboard code={code} />
          </div>
        </div>
      )}

      <div className="text-sm [&>pre]:overflow-x-auto [&>pre]:py-6 [&>pre]:pl-4 [&>pre]:pr-5 [&>pre]:leading-snug [&_code]:block [&_code]:w-fit [&_code]:min-w-full">
        <div
          className="[&>pre]:!bg-zinc-100 dark:hidden"
          dangerouslySetInnerHTML={{ __html: htmlLight }}
        ></div>
        <div
          className="hidden [&>pre]:!bg-zinc-950 dark:block"
          dangerouslySetInnerHTML={{ __html: htmlDark }}
        ></div>
      </div>
    </div>
  );
}
