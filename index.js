'use strict';

module.exports = {
  extends: 'xo-space/esnext',
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
