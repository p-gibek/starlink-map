module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/prop-types': 'off',
    'object-curly-newline': 'off',
    '@typescript-eslint/indent': 'off',
  },
};
