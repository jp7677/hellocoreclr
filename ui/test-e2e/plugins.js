const webpack = require('@cypress/webpack-preprocessor')

module.exports = (on) => {
  on('file:preprocessor', webpack({
    webpackOptions: {
      resolve: {
        extensions: ['.ts', '.js']
      },
      node: { fs: 'empty', child_process: 'empty', readline: 'empty' },
      module: {
        rules: [
          { test: /\.ts$/, exclude: [/node_modules/], use: [{ loader: 'ts-loader' }] },
          { test: /\.feature$/, use: [{ loader: 'cypress-cucumber-preprocessor/loader' }] },
          { test: /\.features$/, use: [{ loader: 'cypress-cucumber-preprocessor/lib/featuresLoader' }] }
        ]
      },
      devtool: 'source-map'
    }
  }))
}
