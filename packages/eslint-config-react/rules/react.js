module.exports = {
  rules: {
    /*
      Enforce spaces inside of curly braces in JSX attributes for better readability
      https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md
    */
    'react/jsx-curly-spacing': [
      'error',
      'always',
    ],

    /*
      overriding airbnb rule that allows .jsx extension
    */
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: [
          '.js',
        ],
      },
    ],

    /*
      Prevent usage of JSX strings in general
      strings should always be translatables, hence simple strings are not allowed
      We keep this a 'warn' to allow strings during dev
      https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-literals.md
    */
    'react/jsx-no-literals': [
      'warn',
      {
        noStrings: true,
        // TODO: add all literals required for a11y and other rules
        allowedStrings: ['button', 'submit'],
      },
    ],

    /*
      Disallow JSX props spreading
      we allow react-intl component here as the only exception
      https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spreading.md
    */
    'react/jsx-props-no-spreading': ['error', {
      html: 'enforce',
      custom: 'enforce',
      explicitSpread: 'ignore',
      exceptions: ['FormattedMessage'],
    }],
  },
};
