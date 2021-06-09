module.exports = {
  plugins: [
    '@hapi/eslint-plugin',
  ],
  rules: {
    /*
      ESLint rule to enforce the capitalization of imported module variables.
      https://github.com/hapijs/hapi-capitalize-modules
    */
    '@hapi/capitalize-modules': 0,

    /*
      hapi style guide ESLint rule dealing with for loops.
      https://github.com/hapijs/rule-for-loop
    */
    '@hapi/for-loop': 0,

    /*
      Enforces the usage of var declarations only in try-catch scope.
      https://github.com/hapijs/hapi-no-var
    */
    '@hapi/no-var': 0,

    /*
      visually separate the function body from the function declaration
      https://github.com/hapijs/hapi-scope-start
    */
    '@hapi/scope-start': 'warn',

    /*
      ESLint rule preventing arrow functions that implicitly return arrow functions.
      https://github.com/hapijs/no-arrowception
    */
    '@hapi/no-arrowception': 'warn',

    /*
      conflicts with hapi/hapi-scope-start
      we also want to allow extra empty lines when readability improves by it
    */
    'padded-blocks': 0,
  },
};
