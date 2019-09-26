const withSass = require('@zeit/next-sass');
const withImages = require('next-images');

module.exports = withImages(
  withSass({
    publicRuntimeConfig: {
      API_HOST: "https://api.test.com" // This should be came from a constant
    }
  })
);
