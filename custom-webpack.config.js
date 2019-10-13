const webpack = require('webpack');
const package = require('./package.json');

module.exports = (config, options) => {
  config.plugins.push(
    new webpack.DefinePlugin({
      APP_NAME: JSON.stringify(package.name),
      APP_VERSION: JSON.stringify(package.version),
      SERVER_URL: JSON.stringify(process.env.SERVER_URL),
      SERVER_PORT: JSON.stringify(process.env.SERVER_PORT)
    })
  );

  return config;
};
