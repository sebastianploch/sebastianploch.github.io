const moment = require("moment");

moment.locale("en");

module.exports = function (eleventyConfig) {
  // Plugins
  const eleventyImagePlugin = require("@11ty/eleventy-img");
  const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
  const eleventySyntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(eleventySyntaxHighlightPlugin);

  // Layouts
  eleventyConfig.addLayoutAlias("default", "layouts/default.njk");
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  // Passthrough Copies
  eleventyConfig.addPassthroughCopy("CNAME");

  // Filters
  eleventyConfig.addFilter("dateIso", (date) => {
    return moment(date).toISOString();
  });

  eleventyConfig.addFilter("dateReadable", (date) => {
    return moment(date).utc().format("LL"); // E.g. May 31, 2019
  });

  // Parsing
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    // Optional, default is "---"
    excerpt_separator: "<!-- excerpt -->",
  });

  // Shortcodes
  eleventyConfig.addShortcode("image", async function (src, alt, sizes) {
    let metadata = await eleventyImagePlugin(src, {
      widths: [300, 600],
      formats: ["avif", "jpeg"],
      urlPath: "/img/",
      outputDir: "./_site/img/",
    });

    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };

    return eleventyImagePlugin.generateHTML(metadata, imageAttributes);
  });

  eleventyConfig.setUseGitIgnore(false);

  return {
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
