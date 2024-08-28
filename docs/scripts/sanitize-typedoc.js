/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
// This is needed because of the following issue on the typedoc plugin
// https://github.com/tgreyuk/typedoc-plugin-markdown/issues/252

const replace = require("replace-in-file");
const path = require("path");
const fs = require("fs");

const mdFiles = "pages/typedoc/**/*.md";
const readmeFile = "pages/typedoc/README.md";

const options = {
  files: mdFiles,
  from: /(?<!\\)</g,
  to: "\\<",
};

try {
  const results = replace.sync(options);
  console.log("Replacement results:", results);
  // Remove main readme file created by typedoc
  if (fs.existsSync(readmeFile)) {
    fs.unlinkSync(readmeFile);
  }

  results.forEach((result) => {
    const fileName = path.basename(result.file);
    const withoutExtension = fileName.split(".")[0];

    replace.sync({
      files: mdFiles,
      from: fileName,
      to: withoutExtension,
    });
  });
} catch (error) {
  console.error("Error occurred:", error);
}
