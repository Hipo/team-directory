const withSass = require('@zeit/next-sass');
const withImages = require('next-images');

module.exports = withImages(
  withSass({
    publicRuntimeConfig: {
      API_HOST: "https://07544a715fd4.ngrok.io/api"
    }
  })
);
