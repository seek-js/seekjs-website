import Link from "next/link"
import { siteConfig } from "./siteConfig"
import { MetalPrimaryButton } from "@/components/ui/MetalPrimaryButton"
import { BrandWordmark } from "@/components/BrandWordmark"
import { ArrowAnimated } from "@/components/ui/ArrowAnimated"

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Link href={siteConfig.baseLinks.home} className="mt-6">
        <BrandWordmark className="text-3xl" />
      </Link>
      <p className="mt-6 text-4xl font-semibold text-zinc-700 sm:text-5xl dark:text-zinc-400">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold text-zinc-950 dark:text-gray-50">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <MetalPrimaryButton asChild className="group mt-8">
        <Link href={siteConfig.baseLinks.home}>
          Go to the home page
          <ArrowAnimated
            className="stroke-zinc-950 dark:stroke-gray-50"
            aria-hidden="true"
          />
        </Link>
      </MetalPrimaryButton>
    </div>
  )
}
