'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

var isProd = (process.env.NODE_ENV === 'production');

module.exports = {
  entry: './src/app.js',
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    contentBase: './dist',
    stats: 'minimal',
    host: '0.0.0.0',
    port: 8000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        exclude: /node_modules/,
        loader: 'file-loader'
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'raw-loader'
      }
    ]
  },
  plugins: [
    //new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      test: /\.scss$/i,
      options: {
        postcss: {
          plugins: [autoprefixer]
        }
      }
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/src/assets',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
  }
};
