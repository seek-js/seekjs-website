"use client";

import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { cx, focusRing } from "@/lib/utils";

export type MetalPrimaryButtonProps = React.ComponentPropsWithoutRef<"span"> & {
  asChild?: boolean;
};

export function MetalPrimaryButton({
  asChild,
  className,
  children,
  ...props
}: MetalPrimaryButtonProps) {
  return (
    <span
      className={cx(
        "z-10 inline-flex h-8 w-fit cursor-pointer items-center justify-center rounded-lg",
        "border border-zinc-300/50 bg-zinc-100/70",
        "px-3 font-semibold uppercase leading-4 tracking-tighter sm:text-sm",
        "transition-colors duration-150",
        "hover:border-zinc-400/60 hover:bg-zinc-200/80",
        "dark:border-zinc-500/30 dark:bg-zinc-800/50",
        "dark:hover:border-zinc-400/40 dark:hover:bg-zinc-800/70",
        className,
      )}
      {...props}
    >
      {asChild ? (
        <Slot
          className={cx(
            "inline-flex items-center gap-1.5 text-metallic no-underline",
            "[&_svg]:size-3.5 [&_svg]:text-zinc-800 dark:[&_svg]:text-zinc-200",
            focusRing,
          )}
        >
          {children}
        </Slot>
      ) : (
        <span className="text-metallic">{children}</span>
      )}
    </span>
  );
}
