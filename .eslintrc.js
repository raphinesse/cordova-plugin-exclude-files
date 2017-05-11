module.exports = {
  'parserOptions': {
    // This is necessary to make ESLint let us use 'use strict' directives
    'sourceType': 'script',
  },
  env: {
    'es6': true,
    'node': true,
  },
  extends: 'standard',
    'rules': {
      'comma-dangle': ['error', 'always-multiline'],
      'linebreak-style': ['error', 'unix'],
      'strict': ['error', 'global'],
    }
}
