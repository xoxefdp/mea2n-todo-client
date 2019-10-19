const webpack = require('webpack');
const package = require('./package.json');

module.exports = (config, options) => {
  config.plugins.push(
    new webpack.DefinePlugin({
      $APP: {
        NAME: JSON.stringify(package.name),
        VERSION: JSON.stringify(package.version)
      },
      $SERVER: {
        URL: JSON.stringify(process.env.SERVER_URL),
        PORT: JSON.stringify(process.env.SERVER_PORT)
      }
    })
  );

  return config;
};
