// Ambient type shims for dependencies that ship no type declarations.
// Kept out of `source/` so it is type-checked locally but never published
// (package.json `files` only ships `source`).

declare module 'eslint-plugin-promise' {
  import type {ESLint, Linter} from 'eslint';

  const plugin: ESLint.Plugin & {
    configs: Record<string, Linter.Config>;
  };

  export default plugin;
}
