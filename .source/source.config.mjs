// .source/config.ts
import { remarkMdxMermaid } from "fumadocs-core/mdx-plugins";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
var docs = defineDocs({
  dir: "content/docs"
});
var config_default = defineConfig({
  mdxOptions: {
    preset: "fumadocs",
    remarkPlugins: [remarkMdxMermaid]
  }
});
export {
  config_default as default,
  docs
};
