import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'y3eqwy',
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'reports/mochawesome',
    overwrite: false,
    html: false,
    json: true
  },
  e2e: {
    baseUrl: "https://practice.expandtesting.com/notes/app",

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});
