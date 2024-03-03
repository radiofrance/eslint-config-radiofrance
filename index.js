'use strict';

module.exports = {
  plugins: ['promise'],
  extends: ['xo', 'plugin:promise/recommended'],
  rules: {
    indent: [2, 2, {SwitchCase: 1}],
    'capitalized-comments': 'off',
    camelcase: 'warn',
    'no-console': 'error',
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: 'next',
      },
    ],
    'prefer-promise-reject-errors': 'warn',
    'promise/no-return-wrap': 'off',
  },
  overrides: [
    {
      extends: ['plugin:package-json/recommended'],
      files: ['package.json'],
      parser: 'jsonc-eslint-parser',
      plugins: ['package-json'],
    },
  ],
};
