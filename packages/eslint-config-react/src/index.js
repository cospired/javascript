import baseConfig, { globalIgnores } from '@cospired/eslint-config-base';
import prettier from 'eslint-config-prettier';

import formatjs from './rules/formatjs.js';
import react from './rules/react.js';

export { globalIgnores };

/** React JavaScript config: base JS + React rules. */
export default [...baseConfig, ...react, formatjs, prettier];
