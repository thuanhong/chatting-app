module.exports = {
  presets: ['next/babel'],
  plugins: [
    [require.resolve('babel-plugin-module-resolver')],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    [
      'babel-plugin-styled-components',
      {
        ssr: true,
        displayName: true,
        preprocess: false,
      },
    ],
  ],
  env: {
    test: {
      plugins: ['babel-plugin-dynamic-import-node'],
    },
  },
};
