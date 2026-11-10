import todoPlz from 'eslint-plugin-todo-plz';

/** TODOs need a ticket: `TODO(#123): ...`. */
export default {
  name: 'cospired/todo-plz',
  plugins: { 'todo-plz': todoPlz },
  rules: { 'todo-plz/ticket-ref': ['error', { pattern: '#\\d+' }] },
};
