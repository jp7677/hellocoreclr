const path = require('path');
const { AureliaPlugin } = require('aurelia-webpack-plugin');
const { ProvidePlugin } = require('webpack');

const src = path.resolve(__dirname, 'src');

module.exports = {
  entry: [ 'aurelia-bootstrapper' ],
 module: {
   rules: [
     { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ },
     { test: /\.html$/i, use: 'html-loader' },
     { test: /\.css$/i, use: 'css-loader' },
     { test: /\.(png|svg|jpg|gif)$/, use: 'file-loader' },
     { test: /\.(woff|woff2|eot|ttf|otf)$/, use: 'file-loader' },
     { test: /\.json$/i, use: 'json-loader' },
   ]
 },
 resolve: {
    extensions: ['.ts', '.js'],
    modules: [src, 'node_modules'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'wwwroot')
  },
  plugins: [
    new AureliaPlugin({ aureliaApp: "app/main" }),
    new ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
    }),
  ]
};
