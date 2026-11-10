import formatjs from './rules/formatjs.js';
import reactHooks from './rules/react-hooks.js';
import reactRefresh from './rules/react-refresh.js';
import react from './rules/react.js';

/** The React-specific config objects, shared by the JavaScript and TypeScript React configs. Prettier must follow them. */
export const reactParts = [...react, ...reactHooks, reactRefresh, formatjs];
