import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      curly: ['error', 'all'],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react\\u0000$', '^react$', '^react-router-dom$', '^react-dom', '^react-hook-form'],
            ['^@tanstack'],
            ['^@'],
            ['^.+\\u0000$'],
            ['^\\.\\./'],
            ['^\\.\\./\\.\\./hooks'],
            ['^\\.\\./\\.\\./types'],
            ['^\\.\\./\\.\\./utils'],
            ['^\\.+\\.(scss|css|module\\.css)$'],
            ['^\\.'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
]);
