const path = require('path')
const { DefinePlugin, SourceMapDevToolPlugin } = require('webpack')

const src = path.resolve(__dirname, 'src')
const test = path.resolve(__dirname, 'test')
const nodeModules = path.resolve(__dirname, 'node_modules')

module.exports = (config) => {
  const noSingleRun = config.nosinglerun

  config.set({
    logLevel: 'warn',
    frameworks: ['mocha'],
    files: [
      { pattern: path.join(src, '**/*.ts'), included: false, served: false, watched: false },
      { pattern: path.join(test, '**/*.spec.ts'), included: false, served: false, watched: false },
      { pattern: path.join(test, 'tests-index.ts'), loaded: false }
    ],
    preprocessors: {
      'test/tests-index.ts': ['webpack']
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          { test: /\.ts$/, loader: 'ts-loader', options: { appendTsSuffixTo: [/\.vue$/] } },
          { test: /\.html$/i, loader: 'vue-template-loader' },
          { test: /\.scss$/i, use: ['style-loader', 'css-loader', 'sass-loader'] },
          { test: /\.(svg)$/i, loader: 'file-loader' },
          { test: /\.(woff|woff2|eot|ttf|otf)$/i, loader: 'file-loader' },
          !noSingleRun
            ? { test: /\.ts$/i, enforce: 'post', loader: 'istanbul-instrumenter-loader', options: { esModules: true }, exclude: test }
            : {}
        ]
      },
      resolve: {
        extensions: ['.ts', '.js'],
        modules: [src, nodeModules]
      },
      plugins: [
        new DefinePlugin({ APPLICATIONMODE: JSON.stringify('Karma') }),
        new SourceMapDevToolPlugin({ filename: null, test: /\.(js|ts)($|\?)/i, moduleFilenameTemplate: './[resource-path]' })
      ],
      devtool: 'source-map'
    },
    webpackMiddleware: {
      stats: 'errors-only',
      noInfo: true
    },
    autoWatchBatchDelay: 10000,
    singleRun: !noSingleRun,
    browsers: !noSingleRun ? ['ChromeHeadless'] : ['ChromeWithRemoteDebugging'],
    customLaunchers: {
      ChromeWithRemoteDebugging: {
        base: 'Chrome',
        flags: ['--remote-debugging-port=9333', 'http://localhost:9876/debug.html']
      }
    },
    mime: {
      'text/x-typescript': ['ts']
    },
    captureTimeout: 5000,
    browserDisconnectTimeout: 5000,
    browserDisconnectTolerance: 5,
    browserNoActivityTimeout: 10000,
    reporters: !noSingleRun ? ['dots', 'coverage-istanbul'] : ['dots'],
    coverageIstanbulReporter: {
      skipFilesWithNoCoverage: false,
      reports: ['text-summary', 'json'],
      fixWebpackSourcePaths: true,
      dir: __dirname.replace('\\', '/') + '/../reports/',
      'report-config': { json: { file: 'coverage-ts.json' } }
    }
  })
}
