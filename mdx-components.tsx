import type { MDXComponents } from "mdx/types";
import { Mermaid } from "@/components/Mermaid";
import {
  Bold,
  ChangelogEntry,
  ChangelogImage,
  CustomLink,
  H1,
  H2,
  H3,
  P,
  Ul,
} from "@/components/mdx";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: CustomLink,
    h1: H1,
    h2: H2,
    h3: H3,
    p: P,
    ul: Ul,
    Bold,
    ChangelogEntry,
    ChangelogImage,
    Mermaid,
    ...components,
  };
}
