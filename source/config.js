import path from 'node:path';
import process from 'node:process';
import {includeIgnoreFile} from '@eslint/compat';
import eslintConfigXo from 'eslint-config-xo';
import promisePlugin from 'eslint-plugin-promise';

export * from './utils.js';

const tsSelector = '**/*.{ts,cts,mts}';
const jsSelector = '**/*.{js,cjs,mjs}';

// `prettier: true` enables the `prettier/prettier` rule (so `eslint --fix` formats)
// and disables the conflicting `@stylistic` rules. It also brings in xo's JSON, JSONC,
// JSON5 and Markdown (GFM) configs.
const xoConfigs = eslintConfigXo({space: 2, prettier: true});

const config = [
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
      // For each require/import, we should a explicit file extension.
      'import-x/extensions': ['error', 'ignorePackages'],
      // No duplicate in import
      'import-x/no-duplicates': 'error',
      // Order import by alphabet and groups ('builtin', 'external', 'internal', etc)
      'import-x/order': ['error', {alphabetize: {order: 'asc'}}],
      // Override from eslint-config-xo to allow Typebox usage.
      'new-cap': [
        'error',
        {
          newIsCap: true,
          capIsNew: true,
          capIsNewExceptionPattern: String.raw`^(?:Value|Type|TypeCompiler)\..`,
        },
      ],
    },
  },

  {
    files: [tsSelector],
    rules: {
      // Force the `.ts` extension and forbid `.js` in relative imports.
      'import-x/extensions': [
        'error',
        'ignorePackages',
        {js: 'never', ts: 'always'},
      ],
      // Use type instead of interface as per global instructions.
      '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
      // Disable theses no-unsafe rules to allow more flexibility.
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-type-assertion': 'off',
    },
  },
];

export default config;
