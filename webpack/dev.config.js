const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    compress: true,
    port: 3000,
    historyApiFallback: true,
    host: "0.0.0.0",
    hot: true,
    inline: true,
    overlay: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      template: './index.ejs'
    })
  ]
}

module.exports = config
