const withSass = require('@zeit/next-sass');

module.exports = withSass({
  publicRuntimeConfig: {
    API_HOST: "https://api.test.com" // This should be came from a constant
  }
});
