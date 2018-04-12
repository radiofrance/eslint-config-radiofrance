'use strict';

module.exports = {
  plugins: ['promise'],
  extends: ['xo-space/esnext', 'plugin:promise/recommended'],
  rules: {
    'capitalized-comments': 'off',
    camelcase: 'warn',
    'no-console': 'error',
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: 'next'
      }
    ],
    'prefer-promise-reject-errors': 'warn'
  }
};
