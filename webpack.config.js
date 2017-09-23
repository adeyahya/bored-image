const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: "./src/Image.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: 'react-bored-image.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components|build)/,
      }
    ]
  }
}

module.exports = config
