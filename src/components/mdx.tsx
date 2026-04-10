import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import React from "react";

export default function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function CustomHeading(props: any) {
  let slug = slugify(props.children);
  return React.createElement(
    `h${props.level}`,
    {
      id: slug,
      className: clsx(
        "scroll-mt-36 md:scroll-mt-24 inline-flex",
        props.className,
      ),
    },
    [
      React.createElement("a", {
        href: `#${slug}`,
        key: `link-${slug}`,
        className: "anchor-link",
      }),
    ],
    props.children,
  );
}

export const H1 = ({ children }: React.HTMLProps<HTMLHeadingElement>) => (
  <CustomHeading
    className="text-3xl font-bold normal-case tracking-tight text-zinc-950 sm:text-4xl dark:text-gray-50"
    level={1}
  >
    {children}
  </CustomHeading>
);

export const H2 = ({ children }: React.HTMLProps<HTMLHeadingElement>) => (
  <CustomHeading
    className="mb-4 text-lg font-semibold normal-case tracking-tight text-zinc-950 dark:text-gray-50"
    level={2}
  >
    {children}
  </CustomHeading>
);

export const H3 = ({ children }: React.HTMLProps<HTMLHeadingElement>) => (
  <CustomHeading
    className="mb-2 font-semibold normal-case tracking-tight text-zinc-950 dark:text-gray-50"
    level={3}
  >
    {children}
  </CustomHeading>
);

export const P = (props: React.HTMLProps<HTMLParagraphElement>) => (
  <p {...props} className="mb-8 leading-7 text-gray-600 dark:text-gray-400" />
);

export const Ul = (props: React.HTMLAttributes<HTMLUListElement>) => (
  <ul
    className="mb-10 ml-[30px] list-['–__'] space-y-1 leading-8 text-gray-600 dark:text-gray-400"
    {...props}
  />
);

export const Bold = (props: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className="font-semibold text-zinc-950 dark:text-gray-50" {...props} />
);

export function CustomLink(props: any) {
  let href = props.href;
  const style =
    "text-zinc-600 font-medium hover:text-zinc-800 dark:text-zinc-400 hover:dark:text-zinc-200";
  if (href.startsWith("/")) {
    return (
      <Link className={style} href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} className={style} />;
  }

  return (
    <a className={style} target="_blank" rel="noopener noreferrer" {...props} />
  );
}

export const ChangelogEntry = ({
  version,
  date,
  children,
}: {
  version: string;
  date: string;
  children: any;
}) => (
  <div className="relative my-12 flex flex-col justify-center gap-x-14 border-b border-zinc-200/50 pb-12 md:flex-row dark:border-zinc-700/40">
    <div className="mb-4 md:mb-10 md:w-1/3">
      <div className="sticky top-24 flex items-center space-x-2 md:block md:space-x-0 md:space-y-1.5">
        <span className="text-metallic inline-flex items-center rounded-lg border border-zinc-300/50 bg-zinc-100/50 px-2.5 py-1 text-xs font-bold ring-1 ring-inset ring-zinc-400/20 dark:border-zinc-500/30 dark:bg-zinc-800/50 dark:ring-zinc-500/15">
          {version}
        </span>
        <span className="block whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
          {date}
        </span>
      </div>
    </div>
    <div className="prose max-w-none">{children}</div>
  </div>
);

export const ChangelogImage = ({
  alt = "",
  width = 1200,
  height = 675,
  src,
  ...props
}: ImageProps) => (
  <Image
    src={src}
    alt={alt}
    width={width}
    height={height}
    className="mb-10 overflow-hidden rounded-xl shadow-md shadow-zinc-400/15 ring-1 ring-zinc-200/40 dark:ring-zinc-700/30"
    {...props}
  />
);
