import * as path from 'node:path';
import {includeIgnoreFile} from '@eslint/compat';
// @ts-ignore
import eslintConfigXo from 'eslint-config-xo';
// @ts-ignore
import promisePlugin from 'eslint-plugin-promise';
/** @import {Linter} from 'eslint' */

export * from './utils.js';

const tsSelector = '**/*.{ts,cts,mts}';
const jsSelector = '**/*.{js,cjs,mjs}';

// Filter out problematic JSON configs that cause "allowTrailingCommas option is only available in JSONC" error
// See: https://github.com/xojs/xo/issues/798
const xoConfigs = /** @type {Linter.Config[]} */ (eslintConfigXo({space: 2}))
  .filter(config => !config.language?.startsWith('json/'));

/** @type {Linter.Config[]} */
export default [
  includeIgnoreFile(path.resolve(process.cwd(), '.gitignore')),

  ...xoConfigs,

  promisePlugin.configs['flat/recommended'],

  {
    files: [jsSelector, tsSelector],
    plugins: {
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
      'import-x/extensions': ['error', 'ignorePackages'],
      // No duplicate in import
      'import-x/no-duplicates': 'error',
      // Order import by alphabet and groups ('builtin', 'external', 'internal', etc)
      'import-x/order': ['error', {alphabetize: {order: 'asc'}}],
      // Override from eslint-config-xo to allow Typebox usage.
      'new-cap': ['error', {
        newIsCap: true,
        capIsNew: true,
        capIsNewExceptionPattern: '^(?:Value|Type|TypeCompiler)\\..',
      }],
      // Add SwitchCase indent on top of xo's space:2 default.
      '@stylistic/indent': ['error', 2, {SwitchCase: 1}],
    },
  },

  {
    files: [tsSelector],
    rules: {
      // Use type instead of interface as per global instructions.
      '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
      // Disable theses no-unsafe rules to allow more flexibility.
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-type-assertion': 'off',
    },
  },
];
