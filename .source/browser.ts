// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from './config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"architecture.mdx": () => import("../content/docs/architecture.mdx?collection=docs"), "comparison.mdx": () => import("../content/docs/comparison.mdx?collection=docs"), "index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "modules.mdx": () => import("../content/docs/modules.mdx?collection=docs"), "roadmap.mdx": () => import("../content/docs/roadmap.mdx?collection=docs"), }),
};
export default browserCollections;