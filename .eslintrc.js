module.exports = {
  extends: ["eslint:recommended", 'prettier'], // extending recommended config and config derived from eslint-config-prettier
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module', // es6 import/export
    ecmaFeatures: {'classes': true },
  },
  'parser': 'babel-eslint',
  plugins: [
      'prettier', // activating esling-plugin-prettier (--fix stuff)
  ],
  rules: {
    eqeqeq: ['error', 'always'], // adding some custom ESLint rules
    "no-console": "off",
    "prettier/prettier": [
          "error",
          {
              singleQuote: true,
              trailingComma: 'all',
              tabWidth: 4,
              printWidth:120,
          },
      ],
  },
  'env': {
      "browser":true,
      "node": true,
      "shared-node-browser":true,
  },
};
