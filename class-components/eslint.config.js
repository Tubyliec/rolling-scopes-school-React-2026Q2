import { dirname } from 'path';
import { fileURLToPath } from 'url';

import next from '@next/eslint-plugin-next';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules', '.next', 'next-env.d.ts'],
  },

  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],

    plugins: {
      '@next/next': next,
      'simple-import-sort': simpleImportSort,
    },

    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
    },

    rules: {
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules,

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
            ['^next'],
            ['^next-intl'],
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
  },

  eslintConfigPrettier
);
