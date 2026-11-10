import formatjs from 'eslint-plugin-formatjs';

import { errorOnly } from './errors.js';

export const testGlobs = ['**/*.{test,spec}.{js,jsx,ts,tsx}'];

/** i18n: formatjs `recommended` plus extras. Test files are exempt. Values are placeholders until the rule review. */
export default {
  plugins: formatjs.configs.recommended.plugins,
  ignores: testGlobs,
  rules: {
    ...errorOnly(formatjs.configs.recommended.rules),
    'formatjs/enforce-description': 'off',
    'formatjs/no-camel-case': 'error',
    'formatjs/no-invalid-icu': 'error',
  },
};
