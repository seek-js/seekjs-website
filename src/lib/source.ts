import { docs } from "../../.source/server";
import { loader } from "fumadocs-core/source";

let pathPrefix = (process.env.GITHUB_PAGES_BASE_PATH ?? "").trim().replace(
  /\/$/,
  "",
);
if (pathPrefix && !pathPrefix.startsWith("/")) {
  pathPrefix = `/${pathPrefix}`;
}
const baseUrl = `${pathPrefix}/docs`.replace(/\/{2,}/g, "/");

export const source = loader({
  baseUrl,
  source: docs.toFumadocsSource(),
});
