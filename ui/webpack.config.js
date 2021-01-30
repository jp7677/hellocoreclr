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
        { test: /\.ts/, loader: 'ts-loader', options: { appendTsSuffixTo: [/\.vue$/] }, exclude: nodeModules },
        { test: /\.vue/, loader: 'vue-loader', exclude: nodeModules },
        { test: /\.html/, loader: 'vue-template-loader', options: { transformAssetUrls: { img: 'src' } } },
        { test: /\.scss/, use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] },
        { test: /\.(svg)/, type: 'asset/resource' },
        { test: /\.(gif|png|jpe?g)/, use: [{ loader: 'file-loader', options: { esModule: false } }, { loader: 'image-webpack-loader', options: { optipng: { optimizationLevel: 8 } } }] },
        { test: /\.(woff|woff2|eot|ttf|otf)/, type: 'asset/resource' }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [src, nodeModules]
    },
    output: {
      filename: isProduction ? '[name]-[contenthash].js' : '[name]-bundle.js',
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
      new CompressionPlugin({ test: /\.(js|html|svg|woff|woff2|eot|ttf|otf)$/, threshold: 1024 })
    ],
    devtool: !isProduction ? 'source-map' : undefined,
    devServer: {
      static: wwwroot,
      port: 3000,
      historyApiFallback: true,
      proxy: { '/api': 'http://localhost:5000' }
    }
  }
}
