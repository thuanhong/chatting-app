module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./src/'],
        alias: {
          '@src': './src',
          '@common': './src/modules/common',
          '@static': './static',
          '@hooks': './src/hooks',
          '@hoc': './src/hoc',
          '@services': './src/services',
          '@utils': './src/utils',
          '@components': './src/modules/components',
          '@mocks': './src/mocks',
        },
      },
    ],
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
