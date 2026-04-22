// eslint.config.js — flat config (ESLint v9+)
import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // --- Ignore patterns ---
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'src/**',          // mockup canvas — don't lint
      '.generated/**',
      'tests/coverage/**',
      'tests/reports/**',
      '*.config.{ts,js}',
    ],
  },

  // --- Base JS ---
  js.configs.recommended,

  // --- TypeScript + React ---
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        fetch: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        React: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // --- TypeScript ---
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],

      // --- React ---
      'react/jsx-uses-react': 'off',        // React 17+ JSX transform
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',             // TypeScript handles this
      'react/display-name': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // --- Brand / quality rules ---
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'eqeqeq': ['error', 'always'],
      'prefer-const': 'error',
      'no-var': 'error',

      // --- Ironbark naming compliance ---
      // Warn if any string contains "War Room" (should be "Strategic Command")
      'no-restricted-syntax': [
        'warn',
        {
          selector: 'Literal[value=/War Room/i]',
          message: 'Use "Strategic Command" instead of "War Room" — see GAP_ANALYSIS.md GAP-03',
        },
        {
          selector: 'Literal[value=/war_room/i]',
          message: 'Use "strategic_command" instead of "war_room" — see GAP_ANALYSIS.md GAP-03',
        },
      ],
    },
  },

  // --- Test files — relaxed rules ---
  {
    files: ['tests/**/*.{ts,tsx}'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
