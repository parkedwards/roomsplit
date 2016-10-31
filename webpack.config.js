const path = require('path');

module.exports = {
  entry: './client/main.js',
  output: {
    publicPath: '',
    filename: 'bundle.js'
  },
  devServer: {
    proxy: {
      '**': {
        target: 'http://localhost:3000/',
        secure: false
      }
    }
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
}