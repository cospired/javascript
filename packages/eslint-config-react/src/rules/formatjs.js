import { anyTestGlobs } from '@cospired/eslint-config-base';
import formatjs from 'eslint-plugin-formatjs';

import { errorOnly } from './errors.js';

/** i18n: formatjs `recommended` plus extras. Test files are exempt. Values are placeholders until the rule review. */
export default {
  plugins: formatjs.configs.recommended.plugins,
  ignores: anyTestGlobs,
  name: 'cospired/formatjs',
  rules: {
    ...errorOnly(formatjs.configs.recommended.rules),
    /*
      Enforce description in message descriptor.
      Off: there is no translator workflow that needs a description on every message yet.
      https://formatjs.github.io/docs/tooling/linter#enforce-description
      https://formatjs.github.io/docs/tooling/linter#enforce-message-types
      https://formatjs.github.io/docs/tooling/linter#no-invalid-icu
    */
    'formatjs/enforce-description': 'off',

    /*
      Enforce (generated) ID in message descriptor.
      Off: message ids are managed by the build tooling, not by hand.
      https://formatjs.github.io/docs/tooling/linter#enforce-id
    */
    'formatjs/enforce-id': 'off',

    /*
      Check ICU placeholders and optionally generate TypeScript argument contracts.
      Off: no project-wide restriction on message types.
      https://formatjs.github.io/docs/tooling/linter#enforce-message-types
    */
    'formatjs/enforce-message-types': 'off',

    /*
      Ban explicit ID from MessageDescriptor.
      Off: message ids are managed by the build tooling, not by hand.
      https://formatjs.github.io/docs/tooling/linter#no-id
    */
    'formatjs/no-id': 'off',

    /*
      Enforce translation of specific object properties.
      Off: plain strings in objects are not translatable text in general.
      https://formatjs.github.io/docs/tooling/linter#no-literal-string-in-object
    */
    'formatjs/no-literal-string-in-object': 'off',

    /*
      Prefer `FormattedMessage` component over `intl.formatMessage` if applicable.
      Off: imperative `intl.formatMessage` is used deliberately.
      https://formatjs.github.io/docs/tooling/linter#prefer-formatted-message
    */
    'formatjs/prefer-formatted-message': 'off',

    /*
      Disallow camel case placeholders in message.
      snake_case placeholders keep translator tooling and translation memories happy.
      https://formatjs.github.io/docs/tooling/linter#no-camel-case
    */
    'formatjs/no-camel-case': 'error',

    /*
      Make sure ICU messages are formatted correctly with no bad select statements, plurals, etc.
      A syntax error in an ICU message only shows up at runtime otherwise.
      https://formatjs.github.io/docs/tooling/linter#no-invalid-icu
    */
    'formatjs/no-invalid-icu': 'error',

  },
};
