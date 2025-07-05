import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://practice.expandtesting.com/notes/app",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
