const webpack = require('webpack');
const package = require('./package.json');

require('dotenv').config()

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      $APP: {
        NAME: JSON.stringify(package.name),
        VERSION: JSON.stringify(package.version)
      },
      $SERVER: {
        URL: JSON.stringify(process.env.SERVER_URL)   || 'SERVER_URL',
        PORT: JSON.stringify(process.env.SERVER_PORT) || 'SERVER_PORT',
      }
    })
  ]
};
