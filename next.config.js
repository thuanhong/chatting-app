const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');
const withSass = require('@zeit/next-sass');

module.exports = withSass(
  withCSS(
    withFonts({
      webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.module.rules.push({
          test: /\.svg$/,
          issuer: {
            test: /\.(js|ts)x?$/,
          },
          use: ['@svgr/webpack'],
        });

        return config;
      },
    }),
  ),
);
