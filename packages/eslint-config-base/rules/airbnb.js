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
      Prefer Object.hasOwn() over Object.prototype.hasOwnProperty.call()
      https://eslint.org/docs/rules/prefer-object-has-own
      TODO: part of but not enabled yet as of airbnb-base@15.0.0,
       remove when enabled
    */
    'prefer-object-has-own': 'warn',
  },
};
