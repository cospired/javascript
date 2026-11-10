import todoPlz from 'eslint-plugin-todo-plz';

/** TODOs need a ticket: `TODO(#123): ...`. */
export default {
  name: 'cospired/todo-plz',
  plugins: { 'todo-plz': todoPlz },
  rules: {
    // eslint-disable-next-line todo-plz/ticket-ref -- documentation text and links contain the word "todo"
    /*
      Require a ticket reference in the to-do comment.
      Every TODO references a ticket so it cannot rot: `TODO(#123): ...`.
      https://github.com/sawyerh/eslint-plugin-todo-plz/blob/main/docs/rules/ticket-ref.md
    */
    'todo-plz/ticket-ref': ['error', { pattern: '#\\d+' }],

  },
};
