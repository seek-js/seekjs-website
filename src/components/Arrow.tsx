"use client"

import { useId } from "react"
import type { SVGProps } from "react"
import { cx } from "@/lib/utils"

export default function Arrow({
  className,
  width,
  height,
  ...props
}: SVGProps<SVGSVGElement>) {
  const rawId = useId().replace(/:/g, "")
  const gradLight = `arrow-silver-light-${rawId}`
  const gradDark = `arrow-silver-dark-${rawId}`

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 10"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cx("shrink-0", className)}
      {...props}
    >
      <defs>
        <linearGradient
          id={gradLight}
          x1="15"
          y1="0"
          x2="15"
          y2="10"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#50505a" />
          <stop offset="22%" stopColor="#70707c" />
          <stop offset="48%" stopColor="#9e9eaa" />
          <stop offset="76%" stopColor="#d8d8e2" />
          <stop offset="100%" stopColor="#e8e8f0" />
        </linearGradient>
        <linearGradient
          id={gradDark}
          x1="15"
          y1="0"
          x2="15"
          y2="10"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#707078" />
          <stop offset="24%" stopColor="#9090a0" />
          <stop offset="48%" stopColor="#b8b8c8" />
          <stop offset="72%" stopColor="#e4e4ee" />
          <stop offset="100%" stopColor="#f0f0f8" />
        </linearGradient>
      </defs>
      <polygon
        points="0,0 30,0 15,10"
        fill={`url(#${gradLight})`}
        className="dark:hidden"
      />
      <polygon
        points="0,0 30,0 15,10"
        fill={`url(#${gradDark})`}
        className="hidden dark:block"
      />
    </svg>
  )
}
