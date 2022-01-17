// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  rules: {
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-var-requires': 1,
    '@typescript-eslint/ban-types': [1, { types: { object: false } }],
    'prettier/prettier': [
      'error',
      {
        printWidth: 180,
        trailingComma: 'all',
        singleQuote: true,
        endOfLine: 'lf',
        semi: true,
        tabWidth: 2,
      },
    ],
  },
};
