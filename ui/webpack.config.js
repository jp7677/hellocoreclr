const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { AureliaPlugin } = require('aurelia-webpack-plugin')
const { DefinePlugin, optimize: { CommonsChunkPlugin, ModuleConcatenationPlugin, UglifyJsPlugin }, ProvidePlugin } = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
const noop = require('noop-webpack-plugin')

const src = path.resolve(__dirname, 'src')
const wwwroot = path.resolve(__dirname, 'wwwroot')
const nodeModules = path.resolve(__dirname, 'node_modules')

module.exports = (env) => {
  const isProduction = env === 'production'
  const isWatch = env === 'watch'

  return {
    entry: {
      app: [ 'aurelia-bootstrapper' ],
      splash: [ 'app/splash' ]
    },
    module: {
      rules: [
        { test: /\.ts$/i, loader: 'ts-loader', exclude: nodeModules },
        { test: /\.html$/i, loader: 'html-loader', options: { minimize: isProduction } },
        { test: /\.css$/i, loader: 'css-loader', options: { minimize: isProduction } },
        { test: /\.(svg)$/i, loader: 'file-loader' },
        { test: /\.(gif|png|jpe?g)$/i, loaders: [ 'file-loader', { loader: 'image-webpack-loader', options: { optipng: { optimizationLevel: 8 } } } ] },
        { test: /\.(woff|woff2|eot|ttf|otf)$/i, loader: 'file-loader' },
        { test: /\.json$/i, loader: 'json-loader' }
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
    plugins: [
      new DefinePlugin({ APPLICATIONMODE: JSON.stringify(isProduction ? 'Production' : 'Development') }),
      new CleanWebpackPlugin([wwwroot]),
      new ProvidePlugin({
        '$': 'jquery',
        'jQuery': 'jquery',
        'Promise': 'bluebird'
      }),
      new AureliaPlugin({ aureliaApp: 'app/main' }),
      new CommonsChunkPlugin({ name: 'bootstrap' }),
      isProduction ? new UglifyJsPlugin({ comments: false }) : noop(),
      !isWatch ? new ModuleConcatenationPlugin() : noop(),
      new HtmlWebpackPlugin({
        template: path.resolve(src, 'index.ejs'),
        favicon: path.resolve(src, 'favicon.ico'),
        chunks: ['bootstrap', 'splash', 'app'],
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
