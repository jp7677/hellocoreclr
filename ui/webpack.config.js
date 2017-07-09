const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { AureliaPlugin } = require('aurelia-webpack-plugin')
const { optimize: { CommonsChunkPlugin }, ProvidePlugin } = require('webpack')

const src = path.resolve(__dirname, 'src')

module.exports = {
  entry: {
    app: [ 'aurelia-bootstrapper' ],
    splash: [ 'app/splash' ]
  },
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ },
      { test: /\.html$/i, use: 'html-loader' },
      { test: /\.css$/i, use: 'css-loader' },
      { test: /\.(png|svg|jpg|gif)$/, use: 'file-loader' },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: 'file-loader' },
      { test: /\.json$/i, use: 'json-loader' }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [src, 'node_modules']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'wwwroot')
  },
  plugins: [
    new CleanWebpackPlugin(['wwwroot']),
    new ProvidePlugin({ '$': 'jquery', 'jQuery': 'jquery' }),
    new AureliaPlugin({ aureliaApp: 'app/main' }),
    new CommonsChunkPlugin({ name: 'bootstrap' }),
    new HtmlWebpackPlugin({ template: 'src/index.ejs', chunks: ['bootstrap', 'splash', 'app'], chunksSortMode: (a, b) => 1 }),
    new CopyWebpackPlugin([{ from: 'src/favicon.ico', to: 'favicon.ico' }])
  ],
  devtool: 'source-map'
}
