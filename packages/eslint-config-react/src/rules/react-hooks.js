import reactHooks from 'eslint-plugin-react-hooks';

import { errorOnly } from './errors.js';

const recommended = reactHooks.configs.flat.recommended;

/** react-hooks `recommended` (warnings upgraded to errors) plus an explicit off for the experimental/internal compiler diagnostics. */
export default [
  { ...recommended, rules: errorOnly(recommended.rules) },
  {
    name: 'cospired/react-hooks',
    rules: {
      'react-hooks/capitalized-calls': 'off',
      'react-hooks/exhaustive-effect-dependencies': 'off',
      'react-hooks/fbt': 'off',
      'react-hooks/hooks': 'off',
      'react-hooks/invariant': 'off',
      'react-hooks/memo-dependencies': 'off',
      'react-hooks/memoized-effect-dependencies': 'off',
      'react-hooks/no-deriving-state-in-effects': 'off',
      'react-hooks/rule-suppression': 'off',
      'react-hooks/syntax': 'off',
      'react-hooks/todo': 'off',
      'react-hooks/void-use-memo': 'off',
    },
  },
];
