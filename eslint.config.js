import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import svelte from "eslint-plugin-svelte";
import { defineConfig } from "eslint/config";
import globals from "globals";
import { fileURLToPath } from "node:url";
import ts from "typescript-eslint";
import svelteConfig from "./svelte.config.js";

const gitignorePath = fileURLToPath(new URL("./.gitignore", import.meta.url));

export default defineConfig(
  includeIgnoreFile(gitignorePath),

  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs.recommended,

  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      "no-undef": "off",
    },
  },

  {
    files: [
      "**/*.js",
      "**/*.ts",
      "**/*.svelte",
      "**/*.svelte.ts",
      "**/*.svelte.js",
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: [".svelte"],
        parser: ts.parser,
        svelteConfig,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "error",

      "array-callback-return": "error",
      "no-async-promise-executor": "error",
      "no-await-in-loop": "warn",
      "no-compare-neg-zero": "warn",
      "no-fallthrough": "error",
      "arrow-body-style": "error",
      "arrow-spacing": "error",
      "consistent-return": "error",
      "max-depth": "error",
      "no-loop-func": "error",
      "no-new-object": "error",
      "no-new-wrappers": "error",
      "no-return-assign": "error",
      "no-return-await": "error",
      "no-useless-escape": "error",
      "no-useless-return": "error",
      "no-void": "error",
      "no-var": "error",
      "no-undef-init": "warn",
      "require-await": "warn",
      "prefer-const": "error",
      "prefer-regex-literals": "error",
      "prefer-spread": "error",
    },
  }
);
