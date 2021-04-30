module.exports = {
  extends: ['airbnb-typescript', 'plugin:react-hooks/recommended'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/prop-types': 'off',
    'object-curly-newline': 'off',
    '@typescript-eslint/indent': 'off',
    'implicit-arrow-linebreak': 'off',
  },
};
