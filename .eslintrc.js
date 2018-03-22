module.exports = {
  parserOptions: {
    // This is necessary to make ESLint let us use 'use strict' directives
    sourceType: 'script',
  },
  env: {
    es6: true,
    node: true,
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'linebreak-style': ['error', 'unix'],
    'no-console': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_$' }],
    'space-before-function-paren': ['error', 'never'],
    strict: ['error', 'global'],
  },
}
