/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
// This is needed because of the following issue on the typedoc plugin
// https://github.com/tgreyuk/typedoc-plugin-markdown/issues/252
import { readFileSync } from "fs";
import markdown from "remark-parse";
import typedocSymbolLinks from "remark-typedoc-symbol-links";
import unified from "unified";

// Load generated TypeDoc
const typedoc = JSON.parse(readFileSync("./typedoc_export.json"));

const doc = unified()
  .use(markdown)
  // Pass typedoc and other options
  .use(typedocSymbolLinks, { typedoc, basePath: "/pages/typedoc" })

  .toString();

console.log(doc);
