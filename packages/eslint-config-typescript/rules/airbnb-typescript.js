const { rules: baseAirbnbRules } = require('@cospired/eslint-config-base/rules/airbnb');

module.exports = {
  rules: {
    // Replace cospired 'no-unused-vars' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
    '@typescript-eslint/no-unused-vars': baseAirbnbRules['no-unused-vars'],

  }
}