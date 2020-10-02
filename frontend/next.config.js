const withSass = require('@zeit/next-sass');
const withImages = require('next-images');

module.exports = withImages(
  withSass({
    publicRuntimeConfig: {
      API_HOST: "http://localhost/api" // This should be came from a constant
    }
  })
);
