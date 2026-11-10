/** General JavaScript rules beyond `@eslint/js` recommended. Severities are placeholders until the rule review. */
export default {
  rules: {
    'logical-assignment-operators': ['error', 'always', { enforceForIfStatements: true }],
    'no-console': 'warn',
    'no-unused-expressions': 'error',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-object-has-own': 'error',
  },
};
