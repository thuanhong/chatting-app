module.exports = {
  extends: ['eslint:recommended', 'plugin:import/errors', 'plugin:react/recommended', 'plugin:jsx-a11y/recommended', 'plugin:prettier/recommended', 'prettier/react'],
  parser: 'babel-eslint',
  settings: {
    react: {
      version: 'latest',
    },
  },
  env: {
    browser: false,
    node: true,
    es6: true,
    mocha: false,
  },
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'valid-jsdoc': [
      'error',
      {
        requireReturn: true,
        requireReturnType: true,
        requireParamDescription: true,
        requireReturnDescription: true,
        preferType: {
          String: 'string',
          object: 'Object',
        },
      },
    ],
    "template-curly-spacing" : "off",
    'require-jsdoc': 0,
    'no-var': 1,
    'padded-blocks': 0,
    'import/no-unresolved': 0,
    'space-before-function-paren': 0,
    'react/prop-types': 0,
    'no-undef': ['warn'],
    'no-eval': 'error',
    indent: ['error', 2],
    quotes: ['error', 'single'],
    'no-console': ['warn', { allow: ['warn', 'info'] }],
    'prefer-arrow-callback': [0, { allowNamedFunctions: true }],
    'func-names': ['error', 'never'],
    'no-use-before-define': [
      'error',
      {
        functions: true,
        classes: true,
      },
    ],
    'max-nested-callbacks': ['error', 5],
  },
};
