import { siteConfig } from "@/app/siteConfig";
import { cx } from "@/lib/utils";

/** Text-only mark for v1 — no logo asset; metallic gradient via globals.css */
export function BrandWordmark({
  className,
}: {
  className?: string;
}) {
  return (
    <span className={cx("text-metallic font-semibold tracking-tight", className)}>
      {siteConfig.name}
    </span>
  );
}
