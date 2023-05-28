const moment = require("moment");

moment.locale("en");

module.exports = function (eleventyConfig) {
  // Plugins
  const eleventyImgPlugin = require("@11ty/eleventy-img");
  module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyImgPlugin);
  };

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

  eleventyConfig.setUseGitIgnore(false);

  return {
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
