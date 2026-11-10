import js from '@eslint/js';

/**
 * ESLint core. `js.configs.recommended` first; below it only rules recommended does not set (or sets differently).
 * Every non-deprecated core rule is configured: here, in recommended, or by eslint-config-prettier (see test/completeness).
 */
export default [
  js.configs.recommended,
  {
    name: 'cospired/eslint',
    rules: {
      /*
        Enforce `return` statements in callbacks of array methods.
        Catches likely bugs.
        https://eslint.org/docs/latest/rules/array-callback-return
      */
      'array-callback-return': 'error',

      /*
        Enforce `default` clauses in `switch` statements to be last.
        Catches likely bugs.
        https://eslint.org/docs/latest/rules/default-case-last
      */
      'default-case-last': 'error',

      /*
        Require `for-in` loops to include an `if` statement.
        Catches likely bugs.
        https://eslint.org/docs/latest/rules/guard-for-in
      */
      'guard-for-in': 'error',

      /*
        Disallow `Array` constructors.
        Catches likely bugs.
        https://eslint.org/docs/latest/rules/no-array-constructor
      */
      'no-array-constructor': 'error',

      /*
        Disallow `await` inside of loops.
        Sequential awaits in a loop are usually accidental; an intentional one needs a disable
        comment with a reason.
        https://eslint.org/docs/latest/rules/no-await-in-loop
      */
      'no-await-in-loop': 'error',

      /*
        Disallow returning value from constructor.
        Catches likely bugs.
        https://eslint.org/docs/latest/rules/no-constructor-return
      */
      'no-constructor-return': 'error',

      /*
        Disallow function declarations that contain unsafe references inside loop statements.
        Catches likely bugs.
        https://eslint.org/docs/latest/rules/no-loop-func
      */
      'no-loop-func': 'error',

      /*
        Disallow `new` operators with the `Function` object.
        Catches likely bugs.
        https://eslint.org/docs/latest/rules/no-new-func
      */
      'no-new-func': 'error',

      /*
        Disallow `new` operators with the `String`, `Number`, and `Boolean` objects.
        Catches likely bugs.
        https://eslint.org/docs/latest/rules/no-new-wrappers
      */
      'no-new-wrappers': 'error',

      /*
        Disallow returning values from Promise executor functions.
        Catches likely bugs.
        https://eslint.org/docs/latest/rules/no-promise-executor-return
      */
      'no-promise-executor-return': 'error',

      /*
        Disallow comparisons where both sides are exactly the same.
        Catches likely bugs.
        https://eslint.org/docs/latest/rules/no-self-compare
      */
      'no-self-compare': 'error',

      /*
        Disallow template literal placeholder syntax in regular strings.
        Catches likely bugs.
        https://eslint.org/docs/latest/rules/no-template-curly-in-string
      */
      'no-template-curly-in-string': 'error',

      /*
        Disallow unmodified loop conditions.
        Catches likely bugs.
        https://eslint.org/docs/latest/rules/no-unmodified-loop-condition
      */
      'no-unmodified-loop-condition': 'error',

      /*
        Disallow loops with a body that allows only one iteration.
        Catches likely bugs.
        https://eslint.org/docs/latest/rules/no-unreachable-loop
      */
      'no-unreachable-loop': 'error',

      /*
        Disallow unused variables.
        Unused code never lands; a leading underscore is the explicit opt-out (arguments, variables,
        caught errors).
        https://eslint.org/docs/latest/rules/no-unused-vars
      */
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],

      /*
        Disallow the use of variables before they are defined.
        Strict: nothing is used before its definition, functions included, so files read top to
        bottom.
        https://eslint.org/docs/latest/rules/no-use-before-define
      */
      'no-use-before-define': 'error',

      /*
        Enforce the use of the radix argument when using `parseInt()`.
        Catches likely bugs.
        https://eslint.org/docs/latest/rules/radix
      */
      radix: 'error',

      /*
        Require symbol descriptions.
        Catches likely bugs.
        https://eslint.org/docs/latest/rules/symbol-description
      */
      'symbol-description': 'error',

      /*
        Disallow the use of `alert`, `confirm`, and `prompt`.
        Avoids unsafe or error-prone language features.
        https://eslint.org/docs/latest/rules/no-alert
      */
      'no-alert': 'error',

      /*
        Disallow the use of `arguments.caller` or `arguments.callee`.
        Avoids unsafe or error-prone language features.
        https://eslint.org/docs/latest/rules/no-caller
      */
      'no-caller': 'error',

      /*
        Disallow the use of `eval()`.
        Avoids unsafe or error-prone language features.
        https://eslint.org/docs/latest/rules/no-eval
      */
      'no-eval': 'error',

      /*
        Disallow extending native types.
        Avoids unsafe or error-prone language features.
        https://eslint.org/docs/latest/rules/no-extend-native
      */
      'no-extend-native': 'error',

      /*
        Disallow the use of `eval()`-like methods.
        Avoids unsafe or error-prone language features.
        https://eslint.org/docs/latest/rules/no-implied-eval
      */
      'no-implied-eval': 'error',

      /*
        Disallow the use of the `__iterator__` property.
        Avoids unsafe or error-prone language features.
        https://eslint.org/docs/latest/rules/no-iterator
      */
      'no-iterator': 'error',

      /*
        Disallow labels that share a name with a variable.
        Avoids unsafe or error-prone language features.
        https://eslint.org/docs/latest/rules/no-label-var
      */
      'no-label-var': 'error',

      /*
        Disallow labeled statements.
        Avoids unsafe or error-prone language features.
        https://eslint.org/docs/latest/rules/no-labels
      */
      'no-labels': 'error',

      /*
        Disallow use of chained assignment expressions.
        Avoids unsafe or error-prone language features.
        https://eslint.org/docs/latest/rules/no-multi-assign
      */
      'no-multi-assign': 'error',

      /*
        Disallow multiline strings.
        Avoids unsafe or error-prone language features.
        https://eslint.org/docs/latest/rules/no-multi-str
      */
      'no-multi-str': 'error',

      /*
        Disallow octal escape sequences in string literals.
        Avoids unsafe or error-prone language features.
        https://eslint.org/docs/latest/rules/no-octal-escape
      */
      'no-octal-escape': 'error',

      /*
        Disallow reassigning function parameters.
        Reassigning a parameter hides what the caller passed; mutating its properties stays allowed
        (builders, reducers, DOM nodes).
        https://eslint.org/docs/latest/rules/no-param-reassign
      */
      'no-param-reassign': ['error', { props: false }],

      /*
        Disallow the use of the `__proto__` property.
        Avoids unsafe or error-prone language features.
        https://eslint.org/docs/latest/rules/no-proto
      */
      'no-proto': 'error',

      /*
        Disallow assignment operators in `return` statements.
        Avoids unsafe or error-prone language features.
        https://eslint.org/docs/latest/rules/no-return-assign
      */
      'no-return-assign': 'error',

      /*
        Disallow `javascript:` URLs.
        Avoids unsafe or error-prone language features.
        https://eslint.org/docs/latest/rules/no-script-url
      */
      'no-script-url': 'error',

      /*
        Disallow comma operators.
        Avoids unsafe or error-prone language features.
        https://eslint.org/docs/latest/rules/no-sequences
      */
      'no-sequences': 'error',

      /*
        Disallow variable declarations from shadowing variables declared in the outer scope.
        An inner variable that reuses an outer name invites mixing the two up.
        https://eslint.org/docs/latest/rules/no-shadow
      */
      'no-shadow': 'error',

      /*
        Disallow initializing variables to `undefined`.
        Avoids unsafe or error-prone language features.
        https://eslint.org/docs/latest/rules/no-undef-init
      */
      'no-undef-init': 'error',

      /*
        Disallow throwing literals as exceptions.
        Avoids unsafe or error-prone language features.
        https://eslint.org/docs/latest/rules/no-throw-literal
      */
      'no-throw-literal': 'error',

      /*
        Require `let` or `const` instead of `var`.
        Avoids unsafe or error-prone language features.
        https://eslint.org/docs/latest/rules/no-var
      */
      'no-var': 'error',

      /*
        Enforce getter and setter pairs in objects and classes.
        Keeps code explicit and consistent.
        https://eslint.org/docs/latest/rules/accessor-pairs
      */
      'accessor-pairs': 'error',

      /*
        Require braces around arrow function bodies.
        No braces and `return` where an expression is enough.
        https://eslint.org/docs/latest/rules/arrow-body-style
      */
      'arrow-body-style': ['error', 'as-needed'],

      /*
        Enforce camelcase naming convention.
        camelCase identifiers; property names are ignored because API payloads often use snake_case.
        https://eslint.org/docs/latest/rules/camelcase
      */
      camelcase: ['error', { properties: 'never' }],

      /*
        Require `return` statements to either always or never specify values.
        A function either always returns a value or never does. Off for TypeScript, where the
        compiler's noImplicitReturns covers it.
        https://eslint.org/docs/latest/rules/consistent-return
      */
      'consistent-return': 'error',

      /*
        Enforce default parameters to be last.
        A default before a required parameter cannot be omitted anyway.
        https://eslint.org/docs/latest/rules/default-param-last
      */
      'default-param-last': 'error',

      /*
        Enforce dot notation whenever possible.
        Keeps code explicit and consistent.
        https://eslint.org/docs/latest/rules/dot-notation
      */
      'dot-notation': 'error',

      /*
        Require the use of `===` and `!==`.
        Strict equality everywhere except `== null`, which checks null and undefined in one go.
        https://eslint.org/docs/latest/rules/eqeqeq
      */
      eqeqeq: ['error', 'always', { null: 'ignore' }],

      /*
        Require function names to match the name of the variable or property to which they are
        assigned.
        Keeps code explicit and consistent.
        https://eslint.org/docs/latest/rules/func-name-matching
      */
      'func-name-matching': 'error',

      /*
        Require grouped accessor pairs in object literals and classes.
        Getter and setter sit next to each other, getter first.
        https://eslint.org/docs/latest/rules/grouped-accessor-pairs
      */
      'grouped-accessor-pairs': ['error', 'getBeforeSet'],

      /*
        Require or disallow logical assignment operator shorthand.
        `a ||= b` instead of `a = a || b`, including the `if (!a) { a = b; }` form.
        https://eslint.org/docs/latest/rules/logical-assignment-operators
      */
      'logical-assignment-operators': ['error', 'always', { enforceForIfStatements: true }],

      /*
        Require constructor names to begin with a capital letter.
        A `new` call needs a capitalized constructor; capitalized calls without `new` stay allowed
        (decorators, factories, `Number()`).
        https://eslint.org/docs/latest/rules/new-cap
      */
      'new-cap': ['error', { capIsNew: false }],

      /*
        Disallow the use of `console`.
        Only `warn` and `error` are runtime reporting; everything else goes through a logger.
        scripts/ are exempt.
        https://eslint.org/docs/latest/rules/no-console
      */
      'no-console': ['error', { allow: ['warn', 'error'] }],

      /*
        Disallow `else` blocks after `return` statements in `if` statements.
        Early returns keep nesting flat; `else if` chains after a return are flagged too.
        https://eslint.org/docs/latest/rules/no-else-return
      */
      'no-else-return': ['error', { allowElseIf: false }],

      /*
        Disallow empty functions.
        Empty functions are usually unfinished; empty arrow functions, functions and methods stay
        allowed for no-op callbacks.
        https://eslint.org/docs/latest/rules/no-empty-function
      */
      'no-empty-function': ['error', { allow: ['arrowFunctions', 'functions', 'methods'] }],

      /*
        Disallow unnecessary calls to `.bind()`.
        Keeps code explicit and consistent.
        https://eslint.org/docs/latest/rules/no-extra-bind
      */
      'no-extra-bind': 'error',

      /*
        Disallow unnecessary labels.
        Keeps code explicit and consistent.
        https://eslint.org/docs/latest/rules/no-extra-label
      */
      'no-extra-label': 'error',

      /*
        Disallow use of `this` in contexts where the value of `this` is `undefined`.
        `this` outside a method is almost always a mistake.
        https://eslint.org/docs/latest/rules/no-invalid-this
      */
      'no-invalid-this': 'error',

      /*
        Disallow unnecessary nested blocks.
        Keeps code explicit and consistent.
        https://eslint.org/docs/latest/rules/no-lone-blocks
      */
      'no-lone-blocks': 'error',

      /*
        Disallow `if` statements as the only statement in `else` blocks.
        Keeps code explicit and consistent.
        https://eslint.org/docs/latest/rules/no-lonely-if
      */
      'no-lonely-if': 'error',

      /*
        Disallow nested ternary expressions.
        Keeps code explicit and consistent.
        https://eslint.org/docs/latest/rules/no-nested-ternary
      */
      'no-nested-ternary': 'error',

      /*
        Disallow calls to the `Object` constructor without an argument.
        Keeps code explicit and consistent.
        https://eslint.org/docs/latest/rules/no-object-constructor
      */
      'no-object-constructor': 'error',

      /*
        Disallow ternary operators when simpler alternatives exist.
        Keeps code explicit and consistent.
        https://eslint.org/docs/latest/rules/no-unneeded-ternary
      */
      'no-unneeded-ternary': 'error',

      /*
        Disallow unused expressions.
        Keeps code explicit and consistent.
        https://eslint.org/docs/latest/rules/no-unused-expressions
      */
      'no-unused-expressions': 'error',

      /*
        Disallow unnecessary calls to `.call()` and `.apply()`.
        Keeps code explicit and consistent.
        https://eslint.org/docs/latest/rules/no-useless-call
      */
      'no-useless-call': 'error',

      /*
        Disallow unnecessary computed property keys in objects and classes.
        Keeps code explicit and consistent.
        https://eslint.org/docs/latest/rules/no-useless-computed-key
      */
      'no-useless-computed-key': 'error',

      /*
        Disallow unnecessary concatenation of literals or template literals.
        Keeps code explicit and consistent.
        https://eslint.org/docs/latest/rules/no-useless-concat
      */
      'no-useless-concat': 'error',

      /*
        Disallow unnecessary constructors.
        A constructor that only forwards to super adds nothing.
        https://eslint.org/docs/latest/rules/no-useless-constructor
      */
      'no-useless-constructor': 'error',

      /*
        Disallow renaming import, export, and destructured assignments to the same name.
        Keeps code explicit and consistent.
        https://eslint.org/docs/latest/rules/no-useless-rename
      */
      'no-useless-rename': 'error',

      /*
        Disallow redundant return statements.
        Keeps code explicit and consistent.
        https://eslint.org/docs/latest/rules/no-useless-return
      */
      'no-useless-return': 'error',

      /*
        Require or disallow method and property shorthand syntax for object literals.
        Keeps code explicit and consistent.
        https://eslint.org/docs/latest/rules/object-shorthand
      */
      'object-shorthand': 'error',

      /*
        Enforce variables to be declared either together or separately in functions.
        One declaration per variable.
        https://eslint.org/docs/latest/rules/one-var
      */
      'one-var': ['error', 'never'],

      /*
        Require or disallow assignment operator shorthand where possible.
        Keeps code explicit and consistent.
        https://eslint.org/docs/latest/rules/operator-assignment
      */
      'operator-assignment': 'error',

      /*
        Require using arrow functions for callbacks.
        Keeps code explicit and consistent.
        https://eslint.org/docs/latest/rules/prefer-arrow-callback
      */
      'prefer-arrow-callback': 'error',

      /*
        Require `const` declarations for variables that are never reassigned after declared.
        Keeps code explicit and consistent.
        https://eslint.org/docs/latest/rules/prefer-const
      */
      'prefer-const': 'error',

      /*
        Disallow the use of `Math.pow` in favor of the `**` operator.
        Keeps code explicit and consistent.
        https://eslint.org/docs/latest/rules/prefer-exponentiation-operator
      */
      'prefer-exponentiation-operator': 'error',

      /*
        Disallow `parseInt()` and `Number.parseInt()` in favor of binary, octal, and hexadecimal
        literals.
        Keeps code explicit and consistent.
        https://eslint.org/docs/latest/rules/prefer-numeric-literals
      */
      'prefer-numeric-literals': 'error',

      /*
        Disallow use of `Object.prototype.hasOwnProperty.call()` and prefer use of
        `Object.hasOwn()`.
        Keeps code explicit and consistent.
        https://eslint.org/docs/latest/rules/prefer-object-has-own
      */
      'prefer-object-has-own': 'error',

      /*
        Disallow using `Object.assign` with an object literal as the first argument and prefer the
        use of object spread instead.
        Keeps code explicit and consistent.
        https://eslint.org/docs/latest/rules/prefer-object-spread
      */
      'prefer-object-spread': 'error',

      /*
        Require using Error objects as Promise rejection reasons.
        Keeps code explicit and consistent.
        https://eslint.org/docs/latest/rules/prefer-promise-reject-errors
      */
      'prefer-promise-reject-errors': 'error',

      /*
        Disallow use of the `RegExp` constructor in favor of regular expression literals.
        Keeps code explicit and consistent.
        https://eslint.org/docs/latest/rules/prefer-regex-literals
      */
      'prefer-regex-literals': 'error',

      /*
        Require rest parameters instead of `arguments`.
        Keeps code explicit and consistent.
        https://eslint.org/docs/latest/rules/prefer-rest-params
      */
      'prefer-rest-params': 'error',

      /*
        Require spread operators instead of `.apply()`.
        Keeps code explicit and consistent.
        https://eslint.org/docs/latest/rules/prefer-spread
      */
      'prefer-spread': 'error',

      /*
        Require template literals instead of string concatenation.
        Keeps code explicit and consistent.
        https://eslint.org/docs/latest/rules/prefer-template
      */
      'prefer-template': 'error',

      /*
        Disallow async functions which have no `await` expression.
        Keeps code explicit and consistent.
        https://eslint.org/docs/latest/rules/require-await
      */
      'require-await': 'error',

      /*
        Require or disallow "Yoda" conditions.
        Keeps code explicit and consistent.
        https://eslint.org/docs/latest/rules/yoda
      */
      yoda: 'error',

      /*
        Enforce the use of variables within the scope they are defined.
        Off: `no-var` makes it redundant.
        https://eslint.org/docs/latest/rules/block-scoped-var
      */
      'block-scoped-var': 'off',

      /*
        Enforce or disallow capitalization of the first letter of a comment.
        Off: opinion; left to review.
        https://eslint.org/docs/latest/rules/capitalized-comments
      */
      'capitalized-comments': 'off',

      /*
        Enforce that class methods utilize `this`.
        Off: opinion; left to review.
        https://eslint.org/docs/latest/rules/class-methods-use-this
      */
      'class-methods-use-this': 'off',

      /*
        Enforce a maximum cyclomatic complexity allowed in a program.
        Off: needs a project-specific threshold.
        https://eslint.org/docs/latest/rules/complexity
      */
      complexity: 'off',

      /*
        Enforce consistent naming when capturing the current execution context.
        Off: opinion; left to review.
        https://eslint.org/docs/latest/rules/consistent-this
      */
      'consistent-this': 'off',

      /*
        Require `default` cases in `switch` statements.
        Off: TypeScript's exhaustiveness checks do this better.
        https://eslint.org/docs/latest/rules/default-case
      */
      'default-case': 'off',

      /*
        Require or disallow named `function` expressions.
        Off: opinion; left to review.
        https://eslint.org/docs/latest/rules/func-names
      */
      'func-names': 'off',

      /*
        Enforce the consistent use of either `function` declarations or expressions assigned to
        variables.
        Off: opinion; left to review.
        https://eslint.org/docs/latest/rules/func-style
      */
      'func-style': 'off',

      /*
        Disallow specified identifiers.
        Off: configured per project; the shared config has nothing to restrict.
        https://eslint.org/docs/latest/rules/id-denylist
      */
      'id-denylist': 'off',

      /*
        Enforce minimum and maximum identifier lengths.
        Off: needs a project-specific threshold.
        https://eslint.org/docs/latest/rules/id-length
      */
      'id-length': 'off',

      /*
        Require identifiers to match a specified regular expression.
        Off: configured per project; the shared config has nothing to restrict.
        https://eslint.org/docs/latest/rules/id-match
      */
      'id-match': 'off',

      /*
        Require or disallow initialization in variable declarations.
        Off: needs a project-specific threshold.
        https://eslint.org/docs/latest/rules/init-declarations
      */
      'init-declarations': 'off',

      /*
        Enforce a maximum number of classes per file.
        Off: needs a project-specific threshold.
        https://eslint.org/docs/latest/rules/max-classes-per-file
      */
      'max-classes-per-file': 'off',

      /*
        Enforce a maximum depth that blocks can be nested.
        Off: needs a project-specific threshold.
        https://eslint.org/docs/latest/rules/max-depth
      */
      'max-depth': 'off',

      /*
        Enforce a maximum number of lines per file.
        Off: needs a project-specific threshold.
        https://eslint.org/docs/latest/rules/max-lines
      */
      'max-lines': 'off',

      /*
        Enforce a maximum number of lines of code in a function.
        Off: needs a project-specific threshold.
        https://eslint.org/docs/latest/rules/max-lines-per-function
      */
      'max-lines-per-function': 'off',

      /*
        Enforce a maximum depth that callbacks can be nested.
        Off: needs a project-specific threshold.
        https://eslint.org/docs/latest/rules/max-nested-callbacks
      */
      'max-nested-callbacks': 'off',

      /*
        Enforce a maximum number of parameters in function definitions.
        Off: needs a project-specific threshold.
        https://eslint.org/docs/latest/rules/max-params
      */
      'max-params': 'off',

      /*
        Enforce a maximum number of statements allowed in function blocks.
        Off: needs a project-specific threshold.
        https://eslint.org/docs/latest/rules/max-statements
      */
      'max-statements': 'off',

      /*
        Disallow bitwise operators.
        Off: opinion; left to review.
        https://eslint.org/docs/latest/rules/no-bitwise
      */
      'no-bitwise': 'off',

      /*
        Disallow `continue` statements.
        Off: opinion; left to review.
        https://eslint.org/docs/latest/rules/no-continue
      */
      'no-continue': 'off',

      /*
        Disallow equal signs explicitly at the beginning of regular expressions.
        Off: opinion; left to review.
        https://eslint.org/docs/latest/rules/no-div-regex
      */
      'no-div-regex': 'off',

      /*
        Disallow duplicate module imports.
        Off: import-x/no-duplicates covers it.
        https://eslint.org/docs/latest/rules/no-duplicate-imports
      */
      'no-duplicate-imports': 'off',

      /*
        Disallow `null` comparisons without type-checking operators.
        Off: eqeqeq allows `== null` on purpose.
        https://eslint.org/docs/latest/rules/no-eq-null
      */
      'no-eq-null': 'off',

      /*
        Disallow shorthand type conversions.
        Off: `!!x` and `+x` are common and clear.
        https://eslint.org/docs/latest/rules/no-implicit-coercion
      */
      'no-implicit-coercion': 'off',

      /*
        Disallow declarations in the global scope.
        Off: opinion; left to review.
        https://eslint.org/docs/latest/rules/no-implicit-globals
      */
      'no-implicit-globals': 'off',

      /*
        Disallow inline comments after code.
        Off: opinion; left to review.
        https://eslint.org/docs/latest/rules/no-inline-comments
      */
      'no-inline-comments': 'off',

      /*
        Disallow variable or `function` declarations in nested blocks.
        Off: block-scoped functions are valid since ES2015.
        https://eslint.org/docs/latest/rules/no-inner-declarations
      */
      'no-inner-declarations': 'off',

      /*
        Disallow magic numbers.
        Off: configured per project; the shared config has nothing to restrict.
        https://eslint.org/docs/latest/rules/no-magic-numbers
      */
      'no-magic-numbers': 'off',

      /*
        Disallow negated conditions.
        Off: opinion; left to review.
        https://eslint.org/docs/latest/rules/no-negated-condition
      */
      'no-negated-condition': 'off',

      /*
        Disallow `new` operators outside of assignments or comparisons.
        Off: `new Foo()` for its side effects is common.
        https://eslint.org/docs/latest/rules/no-new
      */
      'no-new': 'off',

      /*
        Disallow the unary operators `++` and `--`.
        Off: `i++` is idiomatic, and Prettier removes the old ASI risk.
        https://eslint.org/docs/latest/rules/no-plusplus
      */
      'no-plusplus': 'off',

      /*
        Disallow specified names in exports.
        Off: configured per project; the shared config has nothing to restrict.
        https://eslint.org/docs/latest/rules/no-restricted-exports
      */
      'no-restricted-exports': 'off',

      /*
        Disallow specified global variables.
        Off: configured per project; the shared config has nothing to restrict.
        https://eslint.org/docs/latest/rules/no-restricted-globals
      */
      'no-restricted-globals': 'off',

      /*
        Disallow specified modules when loaded by `import`.
        Off: configured per project; the shared config has nothing to restrict.
        https://eslint.org/docs/latest/rules/no-restricted-imports
      */
      'no-restricted-imports': 'off',

      /*
        Disallow certain properties on certain objects.
        Off: configured per project; the shared config has nothing to restrict.
        https://eslint.org/docs/latest/rules/no-restricted-properties
      */
      'no-restricted-properties': 'off',

      /*
        Disallow specified syntax.
        Off: configured per project; the shared config has nothing to restrict.
        https://eslint.org/docs/latest/rules/no-restricted-syntax
      */
      'no-restricted-syntax': 'off',

      /*
        Disallow ternary operators.
        Off: opinion; left to review.
        https://eslint.org/docs/latest/rules/no-ternary
      */
      'no-ternary': 'off',

      /*
        Disallow the use of `undefined` as an identifier.
        Off: `undefined` is a normal value in modern code.
        https://eslint.org/docs/latest/rules/no-undefined
      */
      'no-undefined': 'off',

      /*
        Disallow dangling underscores in identifiers.
        Off: opinion; left to review.
        https://eslint.org/docs/latest/rules/no-underscore-dangle
      */
      'no-underscore-dangle': 'off',

      /*
        Disallow `void` operators.
        Off: `void promise` marks a fire-and-forget call on purpose.
        https://eslint.org/docs/latest/rules/no-void
      */
      'no-void': 'off',

      /*
        Disallow specified warning terms in comments.
        Off: the ticket-ref plugin requires a ticket instead of banning to-dos.
        https://eslint.org/docs/latest/rules/no-warning-comments
      */
      'no-warning-comments': 'off',

      /*
        Require destructuring from arrays and/or objects.
        Off: noisy; destructuring is not always clearer.
        https://eslint.org/docs/latest/rules/prefer-destructuring
      */
      'prefer-destructuring': 'off',

      /*
        Enforce using named capture group in regular expression.
        Off: opinion; left to review.
        https://eslint.org/docs/latest/rules/prefer-named-capture-group
      */
      'prefer-named-capture-group': 'off',

      /*
        Disallow assignments that can lead to race conditions due to usage of `await` or `yield`.
        Off: known false positives.
        https://eslint.org/docs/latest/rules/require-atomic-updates
      */
      'require-atomic-updates': 'off',

      /*
        Enforce the use of `u` or `v` flag on regular expressions.
        Off: opinion; left to review.
        https://eslint.org/docs/latest/rules/require-unicode-regexp
      */
      'require-unicode-regexp': 'off',

      /*
        Enforce sorted `import` declarations within modules.
        Off: import-x/order covers it, with groups.
        https://eslint.org/docs/latest/rules/sort-imports
      */
      'sort-imports': 'off',

      /*
        Require object keys to be sorted.
        Off: opinion; left to review.
        https://eslint.org/docs/latest/rules/sort-keys
      */
      'sort-keys': 'off',

      /*
        Require variables within the same declaration block to be sorted.
        Off: opinion; left to review.
        https://eslint.org/docs/latest/rules/sort-vars
      */
      'sort-vars': 'off',

      /*
        Require or disallow strict mode directives.
        Off: ES modules are strict already.
        https://eslint.org/docs/latest/rules/strict
      */
      strict: 'off',

      /*
        Require or disallow Unicode byte order mark (BOM).
        Off: editors and Prettier handle the byte order mark.
        https://eslint.org/docs/latest/rules/unicode-bom
      */
      'unicode-bom': 'off',

      /*
        Require `var` declarations be placed at the top of their containing scope.
        Off: `no-var` makes it redundant.
        https://eslint.org/docs/latest/rules/vars-on-top
      */
      'vars-on-top': 'off',

    },
  },
];
