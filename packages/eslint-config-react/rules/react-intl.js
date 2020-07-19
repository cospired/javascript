module.exports = {
  plugins: [
    'formatjs',
  ],
  rules: {
    /*
    This blacklists usage of specific elements in ICU message.
    https://github.com/formatjs/formatjs/tree/master/packages/eslint-plugin-formatjs#blacklist-elements
    */
    'formatjs/blacklist-elements': ['off'],

    /*
      Enforce description in messages descriptors
      https://github.com/formatjs/formatjs/tree/master/packages/eslint-plugin-formatjs#enforce-description
    */
    'formatjs/enforce-description': ['error', 'literal'],

    /*
      Enforce default message in messages descriptors
      https://github.com/formatjs/formatjs/tree/master/packages/eslint-plugin-formatjs#enforce-default-message
    */
    'formatjs/enforce-default-message': ['error', 'literal'],

    /*
      Makes sure all values are passed in if message has placeholders
      (number/date/time/plural/select/selectordinal).
      This requires values to be passed in as literal object (not a variable).
      https://github.com/formatjs/formatjs/tree/master/packages/eslint-plugin-formatjs#enforce-placeholders
    */
    'formatjs/enforce-placeholders': ['error'],

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
      This make sure placeholders are not camel-case.
      https://github.com/formatjs/formatjs/tree/master/packages/eslint-plugin-formatjs#no-camel-case
    */
    'formatjs/no-camel-case': ['off'],

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
      This prevents specifying multiple whitespaces in your message.
      https://github.com/formatjs/formatjs/tree/master/packages/eslint-plugin-formatjs#no-multiple-whitespaces
    */
    'formatjs/no-multiple-whitespaces': ['error'],

    /*
      This prevents specifying offset in plural rules in your message.
      https://github.com/formatjs/formatjs/tree/master/packages/eslint-plugin-formatjs#no-offset
    */
    'formatjs/no-offset': ['error'],

    /*
      Since formatjs only supports a subset of DateTime Skeleton.
      This rule exists to make sure you don't use a unsupported pattern.
      https://github.com/formatjs/formatjs/tree/master/packages/eslint-plugin-formatjs#supported-datetime-skeleton
    */
    'formatjs/supported-datetime-skeleton': ['error'],

    /*
      Some pipelines enforces automatic ID generation during transpilation using
      babel-plugin-react-intl or @formatjs/ts-transformer so manual IDs cause issues of
      mismatching during runtime.
      https://formatjs.io/docs/tooling/linter#no-id
    */
    'formatjs/no-id': ['off'],
  },
};
