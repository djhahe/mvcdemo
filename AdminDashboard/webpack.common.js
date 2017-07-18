var webpack = require('webpack');
var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'src/dist/');
var APP_DIR = path.resolve(__dirname, 'src/app/js/components');

var config = {
  devtool: 'cheap-module-source-map',

  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'js/app.js',
    sourceMapFilename: 'app.map'
  },
  module : {
    rules: [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        use:[
          'babel-loader'
        ]
      },
      {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'sass-loader']
        })
      },
      {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader'
         ]
       },
       {
         test: /\.html$/,
         use: [
           'html-loader'
         ]
       }
    ]
  },
   plugins: [
    new ExtractTextPlugin('styles/app.css'),
    new HtmlWebpackPlugin({
      template: 'src/app/index.html'
    })
  ],
  watchOptions: {
    poll: true
  }
};

module.exports = config;