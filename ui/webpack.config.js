const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { AureliaPlugin } = require('aurelia-webpack-plugin')
const { DefinePlugin, ProvidePlugin } = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')

const src = path.resolve(__dirname, 'src')
const wwwroot = path.resolve(__dirname, 'wwwroot')
const nodeModules = path.resolve(__dirname, 'node_modules')

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'

  return {
    entry: {
      app: [ 'aurelia-bootstrapper' ],
      splash: [ 'app/splash' ]
    },
    module: {
      rules: [
        { test: /\.ts$/i, loader: 'ts-loader', exclude: nodeModules },
        { test: /\.html$/i, loader: 'html-loader', options: { minimize: isProduction } },
        { test: /\.css$/i, loader: 'style-loader', issuer: { test: /\.[tj]s$/i } },
        { test: /\.css$/i, loader: 'css-loader', options: { minimize: isProduction } },
        { test: /\.(svg)$/i, loader: 'file-loader' },
        { test: /\.(gif|png|jpe?g)$/i, loaders: [ 'file-loader', { loader: 'image-webpack-loader', options: { optipng: { optimizationLevel: 8 } } } ] },
        { test: /\.(woff|woff2|eot|ttf|otf)$/i, loader: 'file-loader' }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [src, nodeModules]
    },
    output: {
      filename: isProduction ? '[name]-[hash].js' : '[name]-bundle.js',
      path: wwwroot,
      devtoolModuleFilenameTemplate: './[resource-path]'
    },
    performance: { hints: false },
    plugins: [
      new DefinePlugin({ APPLICATIONMODE: JSON.stringify(isProduction ? 'Production' : 'Development') }),
      new CleanWebpackPlugin([wwwroot]),
      new ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        Popper: 'popper.js',
        Promise: 'bluebird'
      }),
      new AureliaPlugin({ aureliaApp: 'app/main' }),
      new HtmlWebpackPlugin({
        template: path.resolve(src, 'index.ejs'),
        favicon: path.resolve(src, 'favicon.ico'),
        chunks: [ 'splash', 'app' ],
        chunksSortMode: 'manual',
        minify: isProduction ? { collapseWhitespace: true, collapseInlineTagWhitespace: true } : false
      }),
      new CompressionPlugin({ asset: '[path].gz[query]', algorithm: 'gzip', test: /\.(js|html)$/, threshold: 1024, minRatio: 0.8 })
    ],
    devtool: !isProduction ? 'source-map' : undefined,
    devServer: {
      contentBase: wwwroot,
      port: 3000,
      historyApiFallback: true,
      proxy: { '/api': 'http://localhost:5000' }
    }
  }
}
