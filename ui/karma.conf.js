const path = require('path')
const { ProvidePlugin } = require('webpack')

const src = path.resolve(__dirname, 'src')
const test = path.resolve(__dirname, 'test')
const nodeModules = path.resolve(__dirname, 'node_modules')

module.exports = (config) => {
  config.set({
    logLevel: 'warn',
    frameworks: ['jasmine'],
    files: [
      {pattern: 'node_modules/core-js/client/shim.js', instrument: false},
      {pattern: 'src/**/*.ts', included: false, served: false, watched: false},
      {pattern: 'test/**/*.spec.ts', included: false, served: false, watched: false},
      {pattern: 'test/tests-index.ts', loaded: false}
    ],
    preprocessors: {
      'test/tests-index.ts': ['webpack']
    },
    webpack: {
      module: {
        rules: [
          { test: /\.ts$/, loader: 'ts-loader', exclude: nodeModules },
          { test: /\.css$/i, loader: 'css-loader' },
          { test: /\.ts$/i, enforce: 'post', loader: 'istanbul-instrumenter-loader', exclude: test }
        ]
      },
      resolve: {
        extensions: ['.ts', '.js'],
        modules: [src, nodeModules]
      },
      plugins: [
        new ProvidePlugin({ '$': 'jquery', 'jQuery': 'jquery' })
      ]
    },
    webpackMiddleware: {
      stats: 'errors-only',
      noInfo: true
    },
    autoWatchBatchDelay: 10000,
    singleRun: true,
    browsers: ['ChromeHeadless'],
    mime: {
      'text/x-typescript': ['ts']
    },
    captureTimeout: 5000,
    browserDisconnectTimeout: 5000,
    browserDisconnectTolerance: 5,
    browserNoActivityTimeout: 10000,
    reporters: [ 'progress', 'coverage-istanbul' ],
    coverageIstanbulReporter: {
      skipFilesWithNoCoverage: false,
      reports: [ 'text-summary', 'json' ],
      fixWebpackSourcePaths: true,
      dir: __dirname.replace('\\', '/') + '/../reports/',
      'report-config': { 'json': { file: 'coverage-ts.json' } }
    }
  })
}
