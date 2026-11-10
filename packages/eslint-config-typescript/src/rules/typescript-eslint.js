/**
 * typescript-eslint, on top of `recommendedTypeChecked` and `stylisticTypeChecked` (added in ../typescript.js).
 * Every non-deprecated rule is configured: here or by a preset (see test/completeness).
 */
export const typescriptRules = {
  /*
    Enforce consistent usage of type imports.
    Type-only imports are written inline (`import { type Foo }`), matching import-x/consistent-type-
    specifier-style, so they vanish at compile time.
    https://typescript-eslint.io/rules/consistent-type-imports
  */
  '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],

  /*
    Enforce default parameters to be last.
    Same as the core rule; the core version is off for TypeScript.
    https://typescript-eslint.io/rules/default-param-last
  */
  '@typescript-eslint/default-param-last': 'error',

  /*
    Disallow using the `delete` operator on computed key expressions.
    Deleting by a computed key defeats the type checker; a Map or an object spread says it better.
    https://typescript-eslint.io/rules/no-dynamic-delete
  */
  '@typescript-eslint/no-dynamic-delete': 'error',

  /*
    Disallow type operations that resolve to the "empty object" type.
    An empty object type accepts everything except null and undefined, which is rarely what was
    meant.
    https://typescript-eslint.io/rules/no-generated-empty-object-type
  */
  '@typescript-eslint/no-generated-empty-object-type': 'error',

  /*
    Enforce the use of top-level import type qualifier when an import only has specifiers with
    inline type qualifiers.
    An import whose specifiers are all `type` would still load the module at runtime; make it a top-
    level `import type`.
    https://typescript-eslint.io/rules/no-import-type-side-effects
  */
  '@typescript-eslint/no-import-type-side-effects': 'error',

  /*
    Disallow `this` keywords outside of classes or class-like objects.
    Same as the core rule; the core version is off for TypeScript.
    https://typescript-eslint.io/rules/no-invalid-this
  */
  '@typescript-eslint/no-invalid-this': 'error',

  /*
    Disallow `void` type outside of generic or return types.
    `void` only makes sense as a return type; elsewhere it usually means `undefined`.
    https://typescript-eslint.io/rules/no-invalid-void-type
  */
  '@typescript-eslint/no-invalid-void-type': 'error',

  /*
    Disallow Promises in places not designed to handle them.
    Promises in conditions or passed where a void return is expected are bugs; unions are checked
    strictly.
    https://typescript-eslint.io/rules/no-misused-promises
  */
  '@typescript-eslint/no-misused-promises': ['error', { checksConditionals: { flagUnions: 'strict' } }],

  /*
    Disallow non-null assertions in the left operand of a nullish coalescing operator.
    `x! ?? y` contradicts itself: if `x` can be null the `!` is wrong, if not the `??` is dead.
    https://typescript-eslint.io/rules/no-non-null-asserted-nullish-coalescing
  */
  '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',

  /*
    Disallow non-null assertions using the `!` postfix operator.
    `!` silences the compiler instead of handling null; narrow or validate instead.
    https://typescript-eslint.io/rules/no-non-null-assertion
  */
  '@typescript-eslint/no-non-null-assertion': 'error',

  /*
    Disallow variable declarations from shadowing variables declared in the outer scope.
    Same as the core rule, but understands types and enums; the core version is off for TypeScript.
    https://typescript-eslint.io/rules/no-shadow
  */
  '@typescript-eslint/no-shadow': 'error',

  /*
    Disallow unnecessary assignment of constructor property parameter.
    A parameter property already assigns the field; assigning it again in the constructor is noise.
    https://typescript-eslint.io/rules/no-unnecessary-parameter-property-assignment
  */
  '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',

  /*
    Disallow unused private class members.
    Same as the core rule; the core version is off for TypeScript.
    https://typescript-eslint.io/rules/no-unused-private-class-members
  */
  '@typescript-eslint/no-unused-private-class-members': 'error',

  /*
    Disallow unused variables.
    Same as the core rule: unused code never lands; a leading underscore is the explicit opt-out.
    https://typescript-eslint.io/rules/no-unused-vars
  */
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],

  /*
    Disallow the use of variables before they are defined.
    Same as the core rule, strict; the core version is off for TypeScript.
    https://typescript-eslint.io/rules/no-use-before-define
  */
  '@typescript-eslint/no-use-before-define': 'error',

  /*
    Disallow unnecessary constructors.
    Same as the core rule, aware of parameter properties; the core version is off for TypeScript.
    https://typescript-eslint.io/rules/no-useless-constructor
  */
  '@typescript-eslint/no-useless-constructor': 'error',

  /*
    Disallow empty exports that don't change anything in a module file.
    An empty `export {}` is only needed in files without other imports or exports.
    https://typescript-eslint.io/rules/no-useless-empty-export
  */
  '@typescript-eslint/no-useless-empty-export': 'error',

  /*
    Require all enum members to be literal values.
    Enum members are literals, so their values are known without evaluating code.
    https://typescript-eslint.io/rules/prefer-literal-enum-member
  */
  '@typescript-eslint/prefer-literal-enum-member': 'error',

  /*
    Disallow two overloads that could be unified into one with a union or an optional/rest
    parameter.
    Overloads that differ by one parameter are clearer as one signature with a union or optional
    parameter.
    https://typescript-eslint.io/rules/unified-signatures
  */
  '@typescript-eslint/unified-signatures': 'error',

  /*
    Require `return` statements to either always or never specify values.
    A function either always returns a value or never does. Off for TypeScript, where the compiler's
    noImplicitReturns covers it.
    https://eslint.org/docs/latest/rules/consistent-return
  */
  'consistent-return': 'off',

  /*
    Enforce default parameters to be last.
    A default before a required parameter cannot be omitted anyway.
    https://eslint.org/docs/latest/rules/default-param-last
  */
  'default-param-last': 'off',

  /*
    Disallow use of `this` in contexts where the value of `this` is `undefined`.
    `this` outside a method is almost always a mistake.
    https://eslint.org/docs/latest/rules/no-invalid-this
  */
  'no-invalid-this': 'off',

  /*
    Disallow variable declarations from shadowing variables declared in the outer scope.
    An inner variable that reuses an outer name invites mixing the two up.
    https://eslint.org/docs/latest/rules/no-shadow
  */
  'no-shadow': 'off',

  /*
    Disallow unused private class members.
    Private members nobody uses are dead code.
    https://eslint.org/docs/latest/rules/no-unused-private-class-members
  */
  'no-unused-private-class-members': 'off',

  /*
    Disallow the use of variables before they are defined.
    Strict: nothing is used before its definition, functions included, so files read top to bottom.
    https://eslint.org/docs/latest/rules/no-use-before-define
  */
  'no-use-before-define': 'off',

  /*
    Disallow unnecessary constructors.
    A constructor that only forwards to super adds nothing.
    https://eslint.org/docs/latest/rules/no-useless-constructor
  */
  'no-useless-constructor': 'off',

  /*
    Enforce that class methods utilize `this`.
    Off: opinion; left to review.
    https://typescript-eslint.io/rules/class-methods-use-this
  */
  '@typescript-eslint/class-methods-use-this': 'off',

  /*
    Require explicit accessibility modifiers on class properties and methods.
    Off: opinion; left to review.
    https://typescript-eslint.io/rules/explicit-member-accessibility
  */
  '@typescript-eslint/explicit-member-accessibility': 'off',

  /*
    Require explicit return and argument types on exported functions' and classes' public class
    methods.
    Off: explicit-function-return-type covers it.
    https://typescript-eslint.io/rules/explicit-module-boundary-types
  */
  '@typescript-eslint/explicit-module-boundary-types': 'off',

  /*
    Require or disallow initialization in variable declarations.
    Off: needs a project-specific threshold.
    https://typescript-eslint.io/rules/init-declarations
  */
  '@typescript-eslint/init-declarations': 'off',

  /*
    Enforce a maximum number of parameters in function definitions.
    Off: needs a project-specific threshold.
    https://typescript-eslint.io/rules/max-params
  */
  '@typescript-eslint/max-params': 'off',

  /*
    Require a consistent member declaration order.
    Off: opinion; left to review.
    https://typescript-eslint.io/rules/member-ordering
  */
  '@typescript-eslint/member-ordering': 'off',

  /*
    Enforce using a particular method signature syntax.
    Off: opinion; left to review.
    https://typescript-eslint.io/rules/method-signature-style
  */
  '@typescript-eslint/method-signature-style': 'off',

  /*
    Disallow duplicate class members.
    Off: the compiler already reports duplicate members.
    https://typescript-eslint.io/rules/no-dupe-class-members
  */
  '@typescript-eslint/no-dupe-class-members': 'off',

  /*
    Disallow classes used as namespaces.
    Off: opinion; left to review.
    https://typescript-eslint.io/rules/no-extraneous-class
  */
  '@typescript-eslint/no-extraneous-class': 'off',

  /*
    Disallow magic numbers.
    Off: configured per project; the shared config has nothing to restrict.
    https://typescript-eslint.io/rules/no-magic-numbers
  */
  '@typescript-eslint/no-magic-numbers': 'off',

  /*
    Disallow variable redeclaration.
    Off: the compiler already reports redeclarations.
    https://typescript-eslint.io/rules/no-redeclare
  */
  '@typescript-eslint/no-redeclare': 'off',

  /*
    Disallow certain types.
    Off: configured per project; the shared config has nothing to restrict.
    https://typescript-eslint.io/rules/no-restricted-types
  */
  '@typescript-eslint/no-restricted-types': 'off',

  /*
    Require or disallow parameter properties in class constructors.
    Off: opinion; left to review.
    https://typescript-eslint.io/rules/parameter-properties
  */
  '@typescript-eslint/parameter-properties': 'off',

  /*
    Require each enum member value to be explicitly initialized.
    Off: opinion; left to review.
    https://typescript-eslint.io/rules/prefer-enum-initializers
  */
  '@typescript-eslint/prefer-enum-initializers': 'off',

};

/** Rules for source files only; tests are exempt. */
export const sourceOnlyRules = {
  /*
    Require explicit return types on functions and class methods.
    Return types are written down in source files; callbacks (expressions) and tests are exempt.
    https://typescript-eslint.io/rules/explicit-function-return-type
  */
  '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],

};
