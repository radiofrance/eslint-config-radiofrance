import * as path from 'node:path';
import {includeIgnoreFile} from '@eslint/compat';
import stylisticPlugin from '@stylistic/eslint-plugin';
// @ts-ignore
import eslintConfigXo from 'eslint-config-xo';
// @ts-ignore
import eslintConfigXoTypeScript from 'eslint-config-xo-typescript';
// @ts-ignore
import * as importPlugin from 'eslint-plugin-import';
// @ts-ignore
import promisePlugin from 'eslint-plugin-promise';
/** @import {Linter} from 'eslint' */

export * from './utils.js';

const tsSelector = '**/*.{ts,cts,mts}';
const jsSelector = '**/*.{js,cjs,mjs}';

// Prevent applying typescript config to javascript files
/** @type {Linter.Config[]} */(eslintConfigXoTypeScript).forEach(config => {
  config.files ??= [tsSelector];
});

/** @type {Linter.Config[]} */
export default [
  includeIgnoreFile(path.resolve(process.cwd(), '.gitignore')),

  ...eslintConfigXo,
  ...eslintConfigXoTypeScript,

  promisePlugin.configs['flat/recommended'],

  {
    files: [jsSelector, tsSelector],
    plugins: {
      '@stylistic': stylisticPlugin,
      import: importPlugin,
      promise: promisePlugin,
    },
    rules: {
      strict: ['error'],
      // Disable because sometimes we need to comment some code.
      'capitalized-comments': 'off',
      // Console should not be used in project. Instead use our internal logger.
      'no-console': 'error',
      // Override from eslint-config-xo to avoid unnecessary newline in file.
      '@stylistic/object-curly-newline': ['error', {consistent: true}],
      // For each require/import, we should a explicit file extension.
      'import/extensions': ['error', 'ignorePackages'],
      // No duplicate in import
      'import/no-duplicates': 'error',
      // Order import by alphabet and groups ('builtin', 'external', 'internal', etc)
      'import/order': ['error', {alphabetize: {order: 'asc'}}],
      // Override from eslint-config-xo to allow Typebox usage.
      'new-cap': ['error', {
        newIsCap: true,
        capIsNew: true,
        capIsNewExceptionPattern: '^(?:Value|Type|TypeCompiler)\\..',
      }],

      '@stylistic/indent': ['error', 2, {SwitchCase: 1}], // copied from eslint-config-xo-typescript/space
      '@stylistic/indent-binary-ops': ['error', 2], // was not set in eslint-config-xo-typescript/space
    },
  },

  {
    files: [tsSelector],
    rules: {
      // Disable this rule because we need interface and type.
      '@typescript-eslint/consistent-type-definitions': 'off',
    },
  },
];
