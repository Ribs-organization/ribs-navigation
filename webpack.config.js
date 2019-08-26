const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: ['./source/scss/style.scss', './source/js/ribs-navigation.js'],
  output: {
    filename: 'js/ribs-navigation.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.join(__dirname, 'source/'), path.join(__dirname, 'node_modules/ribs-core/')],
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/style.min.css',
      chunkFilename:'css/style.min.css',
    }),
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  },
};