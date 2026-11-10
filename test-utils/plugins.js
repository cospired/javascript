import comments from '@eslint-community/eslint-plugin-eslint-comments';
import stylistic from '@stylistic/eslint-plugin';
import { builtinRules } from 'eslint/use-at-your-own-risk';
import formatjs from 'eslint-plugin-formatjs';
import importX from 'eslint-plugin-import-x';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import todoPlz from 'eslint-plugin-todo-plz';
import tseslint from 'typescript-eslint';

/** Every plugin the configs use, keyed by rule namespace ('' = ESLint core). */
export const pluginRules = {
  '': Object.fromEntries(builtinRules),
  '@eslint-community/eslint-comments': comments.rules,
  '@stylistic': stylistic.rules,
  '@typescript-eslint': tseslint.plugin.rules,
  formatjs: formatjs.rules,
  'import-x': importX.rules,
  'react-hooks': reactHooks.rules,
  'react-refresh': reactRefresh.rules,
  'todo-plz': todoPlz.rules,
};

/** Namespaces each shipped config must cover completely. */
export const baseNamespaces = ['', '@eslint-community/eslint-comments', '@stylistic', 'import-x', 'todo-plz'];
export const typescriptNamespaces = [...baseNamespaces, '@typescript-eslint'];
export const reactNamespaces = ['react-hooks', 'react-refresh', 'formatjs'];
