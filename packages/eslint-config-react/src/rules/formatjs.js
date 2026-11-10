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
    'formatjs/enforce-description': 'off',
    'formatjs/enforce-id': 'off',
    'formatjs/enforce-message-types': 'off',
    'formatjs/no-id': 'off',
    'formatjs/no-literal-string-in-object': 'off',
    'formatjs/prefer-formatted-message': 'off',
    'formatjs/no-camel-case': 'error',
    'formatjs/no-invalid-icu': 'error',
  },
};
