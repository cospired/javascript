module.exports = {
  plugins: [
    'formatjs',
  ],
  rules: {
    /*
      Makes sure all values are passed in if message has placeholders
      (number/date/time/plural/select/selectordinal).
      This requires values to be passed in as literal object (not a variable).
      https://github.com/formatjs/formatjs/tree/master/packages/eslint-plugin-formatjs#enforce-placeholders
    */
    'formatjs/enforce-placeholders': ['error'],

    /*
      Enforce description in messages descriptors
      https://github.com/formatjs/formatjs/tree/master/packages/eslint-plugin-formatjs#enforce-description
    */
    'formatjs/enforce-description': ['error'],

    /*
      This make sure placeholders are not camel-case.
      https://github.com/formatjs/formatjs/tree/master/packages/eslint-plugin-formatjs#no-camel-case
    */
    'formatjs/no-camel-case': ['off'],

    /*
      Enforce certain plural rules to always be specified/forbidden in a message.
      https://github.com/formatjs/formatjs/tree/master/packages/eslint-plugin-formatjs#enforce-plural-rules
    */
    'formatjs/enforce-plural-rules': [
      'warn',
      {
        one: true,
        other: true,
        zero: false,
      },
    ],

    /*
      This prevents usage of emoji in message.
      https://github.com/formatjs/formatjs/tree/master/packages/eslint-plugin-formatjs#no-emoji
    */
    'formatjs/no-emoji': ['off'],

    /*
      This prevents specifying multiple plurals in your message.
      https://github.com/formatjs/formatjs/tree/master/packages/eslint-plugin-formatjs#no-multiple-plurals
    */
    'formatjs/no-multiple-plurals': ['error'],

    /*
      This prevents specifying offset in plural rules in your message.
      https://github.com/formatjs/formatjs/tree/master/packages/eslint-plugin-formatjs#no-offset
    */
    'formatjs/no-offset': ['error'],
  },
};
