/**
 * @filename: lint-staged.config.mjs
 * @type {import('lint-staged').Configuration}
 */
export default {
  "*.{css,json,scss,yml}": "prettier --write",
  "*.{js,jsx,cjs,mjs,ts,tsx}": ["eslint --fix", "prettier --write"],
  "schema.prisma": (filenames) =>
    filenames.flatMap((filename) => [
      `prisma format --schema=${filename}`,
      `prisma-case-format --file ${filename}`,
    ]),
};
