const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { DefinePlugin, ProvidePlugin } = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')

const src = path.resolve(__dirname, 'src')
const wwwroot = path.resolve(__dirname, 'wwwroot')
const nodeModules = path.resolve(__dirname, 'node_modules')

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'

  return {
    entry: {
      app: ['app/main'],
      splash: ['app/splash']
    },
    module: {
      rules: [
        { test: /\.ts$/i, loader: 'ts-loader', options: { appendTsSuffixTo: [/\.vue$/] }, exclude: nodeModules },
        { test: /\.vue$/i, loader: 'vue-loader', exclude: nodeModules },
        { test: /\.html$/i, loader: 'vue-template-loader', options: { transformAssetUrls: { img: 'src' } } },
        { test: /\.scss$/i, use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] },
        { test: /\.(svg)$/i, loader: 'file-loader' },
        { test: /\.(gif|png|jpe?g)$/i, use: [{ loader: 'file-loader', options: { esModule: false } }, { loader: 'image-webpack-loader', options: { optipng: { optimizationLevel: 8 } } }] },
        { test: /\.(woff|woff2|eot|ttf|otf)$/i, loader: 'file-loader' }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [src, nodeModules]
    },
    output: {
      filename: isProduction ? '[name]-[hash].js' : '[name]-bundle.js',
      path: wwwroot
    },
    performance: { hints: false },
    plugins: [
      new DefinePlugin({ APPLICATIONMODE: JSON.stringify(isProduction ? 'Production' : 'Development') }),
      new CleanWebpackPlugin(),
      new ProvidePlugin({
        Popper: 'popper.js',
        Promise: 'bluebird'
      }),
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(src, 'index.ejs'),
        favicon: path.resolve(src, 'favicon.ico'),
        chunks: ['splash', 'app'],
        chunksSortMode: 'manual',
        minify: isProduction ? { collapseWhitespace: true, collapseInlineTagWhitespace: true } : false
      }),
      new CompressionPlugin({ test: /\.(js|html)$/, threshold: 1024 })
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
