const withImages = require("next-images");
const withVideos = require("next-videos");
const withCSS = require("@zeit/next-css");

module.exports = withVideos(
  withImages(
    withCSS({
      cssLoaderOptions: {
        url: false,
      },
      esModule: true,
      target: "serverless",
    })
  )
);
