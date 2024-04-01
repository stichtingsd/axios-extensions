/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@axios-extensions/eslint-config/main.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.lint.json",
    tsconfigRootDir: __dirname,
  },
};
