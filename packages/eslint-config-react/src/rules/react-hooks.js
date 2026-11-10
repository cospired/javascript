import reactHooks from 'eslint-plugin-react-hooks';

import { errorOnly } from './errors.js';

const recommended = reactHooks.configs.flat.recommended;

/** react-hooks `recommended` (warnings upgraded to errors) plus an explicit off for the experimental/internal compiler diagnostics. */
export default [
  { ...recommended, rules: errorOnly(recommended.rules) },
  {
    name: 'cospired/react-hooks',
    rules: {
      /*
        Validates against calling capitalized functions/methods instead of using JSX.
        Off: experimental or internal React Compiler diagnostic, not part of the stable recommended
        set.
        https://react.dev/reference/eslint-plugin-react-hooks/lints/capitalized-calls
      */
      'react-hooks/capitalized-calls': 'off',

      /*
        Validates that effect dependencies are exhaustive and without extraneous values.
        Off: experimental or internal React Compiler diagnostic, not part of the stable recommended
        set.
        https://react.dev/reference/eslint-plugin-react-hooks/lints/exhaustive-effect-dependencies
      */
      'react-hooks/exhaustive-effect-dependencies': 'off',

      /*
        Validates usage of fbt.
        Off: experimental or internal React Compiler diagnostic, not part of the stable recommended
        set.
        https://react.dev/reference/eslint-plugin-react-hooks/lints/fbt
      */
      'react-hooks/fbt': 'off',

      /*
        Validates the rules of hooks.
        Off: experimental or internal React Compiler diagnostic, not part of the stable recommended
        set.
        https://react.dev/reference/eslint-plugin-react-hooks/lints/hooks
      */
      'react-hooks/hooks': 'off',

      /*
        Internal invariants.
        Off: experimental or internal React Compiler diagnostic, not part of the stable recommended
        set.
        https://react.dev/reference/eslint-plugin-react-hooks/lints/invariant
      */
      'react-hooks/invariant': 'off',

      /*
        Validates that useMemo() and useCallback() specify comprehensive dependencies without
        extraneous values. See [`useMemo()` docs](https://react.dev/reference/react/useMemo) for
        more information.
        Off: experimental or internal React Compiler diagnostic, not part of the stable recommended
        set.
        https://react.dev/reference/eslint-plugin-react-hooks/lints/memo-dependencies
      */
      'react-hooks/memo-dependencies': 'off',

      /*
        Validates that effect dependencies are memoized.
        Off: experimental or internal React Compiler diagnostic, not part of the stable recommended
        set.
        https://react.dev/reference/eslint-plugin-react-hooks/lints/memoized-effect-dependencies
      */
      'react-hooks/memoized-effect-dependencies': 'off',

      /*
        Validates against deriving values from state in an effect.
        Off: experimental or internal React Compiler diagnostic, not part of the stable recommended
        set.
        https://react.dev/reference/eslint-plugin-react-hooks/lints/no-deriving-state-in-effects
      */
      'react-hooks/no-deriving-state-in-effects': 'off',

      /*
        Validates against suppression of other rules.
        Off: experimental or internal React Compiler diagnostic, not part of the stable recommended
        set.
        https://react.dev/reference/eslint-plugin-react-hooks/lints/rule-suppression
      */
      'react-hooks/rule-suppression': 'off',

      /*
        Validates against invalid syntax.
        Off: experimental or internal React Compiler diagnostic, not part of the stable recommended
        set.
        https://react.dev/reference/eslint-plugin-react-hooks/lints/syntax
      */
      'react-hooks/syntax': 'off',

      // eslint-disable-next-line todo-plz/ticket-ref -- documentation text and links contain the word "todo"
      /*
        Unimplemented features.
        Off: experimental or internal React Compiler diagnostic, not part of the stable recommended
        set.
        https://react.dev/reference/eslint-plugin-react-hooks/lints/todo
      */
      'react-hooks/todo': 'off',

      /*
        Validates that useMemos always return a value and that the result of the useMemo is used by
        the component/hook. See [`useMemo()` docs](https://react.dev/reference/react/useMemo) for
        more information.
        Off: experimental or internal React Compiler diagnostic, not part of the stable recommended
        set.
        https://react.dev/reference/eslint-plugin-react-hooks/lints/void-use-memo
      */
      'react-hooks/void-use-memo': 'off',

    },
  },
];
