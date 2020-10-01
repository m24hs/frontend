const withImages = require("next-images");
const withVideos = require("next-videos");
const withCSS = require('@zeit/next-css')

module.exports = withCSS(withVideos(
  withImages({
    esModule: true,
    target: "serverless",
  })
));
