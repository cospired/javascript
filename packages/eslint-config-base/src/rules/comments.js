import { recommended } from '@eslint-community/eslint-plugin-eslint-comments/configs';
import todoPlz from 'eslint-plugin-todo-plz';

/** Directive comments need a reason, TODOs need a ticket. */
export default {
  plugins: { ...recommended.plugins, 'todo-plz': todoPlz },
  linterOptions: { reportUnusedDisableDirectives: 'error' },
  rules: {
    ...recommended.rules,
    '@eslint-community/eslint-comments/require-description': 'error',
    'todo-plz/ticket-ref': ['error', { pattern: '#\\d+' }],
  },
};
