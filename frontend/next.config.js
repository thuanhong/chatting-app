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
        // config.resolve.fallback = {
        //   ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
        //     // by next.js will be dropped. Doesn't make much sense, but how it is
        //   fs: false, // the solution
        // };

        return config;
      },
    }),
  ),
);
