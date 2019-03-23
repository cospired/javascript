module.exports = {
  rules: {
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
      Disallow unnecessary catch clauses
      https://eslint.org/docs/rules/no-useless-catch
      TODO: part of airbnb-base but not published yet as of 2019-03-23,
       remove when published
    */
    'no-useless-catch': 'off',

    /*
      Suggest using named capture group in regular expression
      https://eslint.org/docs/rules/prefer-named-capture-group
      TODO: part of airbnb-base but not published yet as of 2019-03-23,
       remove when published
    */
    'prefer-named-capture-group': 'off',
  },
};
