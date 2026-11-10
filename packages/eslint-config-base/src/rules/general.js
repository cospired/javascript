/** General JavaScript rules beyond `@eslint/js` recommended. Every rule here was decided in the rule review (docs/rules.md). */
export default {
  rules: {
    'consistent-return': 'error',
    'default-param-last': 'error',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'logical-assignment-operators': ['error', 'always', { enforceForIfStatements: true }],
    'no-await-in-loop': 'error',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-else-return': ['error', { allowElseIf: false }],
    'no-nested-ternary': 'error',
    'no-param-reassign': ['error', { props: false }],
    'no-shadow': 'error',
    'no-unused-expressions': 'error',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
    'no-use-before-define': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-object-has-own': 'error',
    'prefer-template': 'error',
  },
};
