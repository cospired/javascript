module.exports = {
  rules: {
    /*
      force default params to be last
      https://eslint.org/docs/rules/default-param-last
      TODO: part of but not enabled yet as of airbnb-base@14.2.1,
       remove when enabled
    */
    'default-param-last': 'error',

    /*
      Suggest using consistent newlines in function calls
      https://eslint.org/docs/rules/function-call-argument-newline
      TODO: part of but not enabled yet as of airbnb-base@14.2.1,
       remove when enabled
    */
    'function-call-argument-newline': ['warn', 'consistent'],

    /*
      restrict the number of statements per line
      https://eslint.org/docs/rules/max-statements-per-line
    */
    'max-statements-per-line': [
      'warn',
      {
        max: 1,
      },
    ],

    /*
      visually separate returns from other code. Makes early returns
      easy to see and helps with overall readability
      https://eslint.org/docs/rules/newline-before-return
    */
    'newline-before-return': 'warn',

    /*
      warns the assignments, increments, and decrements of imported bindings
      https://eslint.org/docs/rules/no-import-assign
      TODO: part of but not enabled yet as of airbnb-base@14.2.1,
       remove when enabled
    */
    'no-import-assign': 'error',

    /*
      Disallow \8 and \9 escape sequences in string literals
      https://eslint.org/docs/rules/no-nonoctal-decimal-escape
      TODO: part of but not enabled yet as of airbnb-base@14.2.1,
       remove when enabled
    */
    'no-nonoctal-decimal-escape': 'error',

    /*
      disallow use of optional chaining in contexts where the undefined value is not allowed
      https://eslint.org/docs/rules/no-unsafe-optional-chaining
      TODO: part of but not enabled yet as of airbnb-base@14.2.1,
       remove when enabled
    */
    'no-unsafe-optional-chaining': ['error', { disallowArithmeticOperators: true }],

    /*
      warn for unused vars, but allow args vars to be listed if not used
      https://eslint.org/docs/rules/no-unused-vars
    */
    'no-unused-vars': [
      'warn',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        vars: 'all',
      },
    ],

    /*
      disallow use of the RegExp constructor in favor of regular expression literals
      https://eslint.org/docs/rules/prefer-regex-literals
      TODO: part of but not enabled yet as of airbnb-base@14.2.1,
       remove when enabled
    */
    'prefer-regex-literals': 'warn',

    /*
      Disallow returning values from Promise executor functions
      https://eslint.org/docs/rules/no-promise-executor-return
      TODO: part of but not enabled yet as of airbnb-base@14.2.1,
    */
    'no-promise-executor-return': 'error',

    /*
      Disallow loops with a body that allows only one iteration
      https://eslint.org/docs/rules/no-unreachable-loop
      TODO: part of but not enabled yet as of airbnb-base@14.2.1,
       remove when enabled/ check for airbnb default
    */
    'no-unreachable-loop': ['error', {
      ignore: [], // WhileStatement, DoWhileStatement, ForStatement, ForInStatement, ForOfStatement
    }],
  },
};
