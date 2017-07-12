const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { AureliaPlugin } = require('aurelia-webpack-plugin')
const { DefinePlugin, optimize: { CommonsChunkPlugin, UglifyJsPlugin }, ProvidePlugin } = require('webpack')
const noop = require('noop-webpack-plugin')

const src = path.resolve(__dirname, 'src')
const wwwroot = path.resolve(__dirname, 'wwwroot')

module.exports = (env) => {
  const isProduction = env === 'production'

  return {
    entry: {
      app: [ 'aurelia-bootstrapper' ],
      splash: [ 'app/splash' ]
    },
    module: {
      rules: [
        { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ },
        { test: /\.html$/i, use: { loader: 'html-loader', options: { minimize: isProduction } } },
        { test: /\.css$/i, use: { loader: 'css-loader', options: { minimize: isProduction } } },
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
      path: wwwroot,
      devtoolModuleFilenameTemplate: './[resource-path]'
    },
    plugins: [
      new DefinePlugin({ APPLICATIONMODE: JSON.stringify(isProduction ? 'Production' : 'Development') }),
      new CleanWebpackPlugin([wwwroot]),
      new ProvidePlugin({ '$': 'jquery', 'jQuery': 'jquery' }),
      new AureliaPlugin({ aureliaApp: 'app/main' }),
      new CommonsChunkPlugin({ name: 'bootstrap' }),
      isProduction ? new UglifyJsPlugin({ comments: false }) : noop(),
      new HtmlWebpackPlugin({
        template: path.resolve(src, 'index.ejs'),
        favicon: path.resolve(src, 'favicon.ico'),
        chunks: ['bootstrap', 'splash', 'app'],
        chunksSortMode: (a, b) => 1,
        minify: isProduction ? { collapseWhitespace: true, collapseInlineTagWhitespace: true } : false
      })
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
