module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, // Ajoute l'environnement Node.js
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off', // Désactive la règle obsolète
  },
  settings: {
    react: {
      version: 'detect', // Auto-détection de la version de React
    },
    'import/resolver': {
      alias: {
        map: [['#', './src']], // Remappez "#" vers "src
        extensions: ['.ts', '.tsx', '.js', '.jsx'], // Extensions supportées
      },
    },
  },
};
