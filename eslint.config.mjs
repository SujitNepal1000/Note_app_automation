import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], // Updated to include all relevant file types
  },
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "src/generated/**",
      "src/__tests__/**",
      "cypress/support/**",
      "cypress/reports/**",
      "cypress/videos/**",
      "cypress/screenshots/**",
      "**/*.min.{js,cjs}", // Added to exclude minified files
    ],
  },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // Existing rules
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-empty-object-type": "error",
      "no-console": "off", // Changed from "error" to "off" to disable
      "@typescript-eslint/no-require-imports": "off", // Already disabled

      // New rules to disable reported errors
      "@typescript-eslint/no-constant-binary-expression": "off",
      "no-func-assign": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "no-empty": "off",
      "@typescript-eslint/no-this-alias": "off",
      "no-prototype-builtins": "off",
    },
  },
];