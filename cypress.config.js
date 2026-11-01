const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true,                 // default is false in Cypress 13+
  videoCompression: 32,        // optional; false = larger files, best quality
  videosFolder: 'cypress/videos', //Add videos folder for recording test run
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
