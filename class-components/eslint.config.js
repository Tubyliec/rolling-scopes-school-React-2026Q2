import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactPlugin from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  ignores: ['dist', 'node_modules'],
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ['**/*.{ts,tsx}'],
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    react: reactPlugin,
    'simple-import-sort': simpleImportSort,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    ...reactPlugin.configs.recommended.rules,
    ...reactPlugin.configs['jsx-runtime'].rules,
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          [
            '^react\\u0000$',
            '^react$',
            '^react-router-dom$',
            '^react-dom',
            '^react-hook-form',
          ],
          ['^@tanstack'],
          ['^@core'],
          ['^@/core'],
          ['^@entities'],
          ['^@/entities'],
          ['^@features'],
          ['^@/features'],
          ['^@pages'],
          ['^@/pages'],
          ['^@widgets'],
          ['^@/widgets'],
          ['^@shared'],
          ['^@/shared'],
          ['^@'],
          ['^.+\\u0000$'],
          ['^\\.'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  languageOptions: {
    globals: globals.browser,
  },
});
