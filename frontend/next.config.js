const withSass = require('@zeit/next-sass');
const withImages = require('next-images');

module.exports = withImages(
  withSass({
    publicRuntimeConfig: {
      API_HOST: "http://127.0.0.1:8000" // This should be came from a constant
    }
  })
);
