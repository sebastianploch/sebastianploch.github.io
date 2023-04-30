const moment = require('moment');
 
moment.locale('en');
 
module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter('dateIso', date => {
    return moment(date).toISOString();
  });
 
  eleventyConfig.addFilter('dateReadable', date => {
    return moment(date).utc().format('LL'); // E.g. May 31, 2019
  });

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    // Optional, default is "---"
    excerpt_separator: "<!-- excerpt -->"
  });
};