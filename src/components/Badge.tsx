import React from "react"
import { cx } from "@/lib/utils"

interface BadgeProps extends React.ComponentPropsWithoutRef<"span"> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, className, ...props }: BadgeProps, forwardedRef) => {
    return (
      <span
        ref={forwardedRef}
        className={cx(
          "z-10 block w-fit rounded-lg border border-zinc-300/50 bg-zinc-100/70 px-3 py-1.5 font-semibold uppercase leading-4 tracking-tighter sm:text-sm dark:border-zinc-500/30 dark:bg-zinc-800/50",
          className,
        )}
        {...props}
      >
        <span className="text-metallic">
          {children}
        </span>
      </span>
    )
  },
)

Badge.displayName = "Badge"

export { Badge, type BadgeProps }
