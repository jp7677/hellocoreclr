const webpackConfig = require('./webpack.config')

module.exports = (config) => {
  'use strict'

  config.set({
    logLevel: 'warn',
    frameworks: ['mocha', 'chai', 'sinon'],

    files: [
      'node_modules/core-js/client/shim.js',
      'test/**/*.spec.ts'
    ],

    preprocessors: {
      'src/app/**/*.ts': ['webpack', 'coverage', 'sourcemap'],
      'test/**/*.spec.ts': ['webpack']
    },

    webpack: {
      module: webpackConfig().module,
      resolve: webpackConfig().resolve
    },

    webpackMiddleware: {
      stats: 'errors-only'
    },

    autoWatchBatchDelay: 10000,
    singleRun: true,
    browsers: ['PhantomJS'],
    mime: {
      'text/x-typescript': ['ts']
    },

    captureTimeout: 5000,
    browserDisconnectTimeout: 5000,
    browserDisconnectTolerance: 5,
    browserNoActivityTimeout: 10000,

    reporters: ['mocha', 'coverage', 'remap-coverage'],
    mochaReporter: {
      output: 'autowatch'
    },
    coverageReporter: {
      type: 'in-memory',
      includeAllSources: true
    },
    remapCoverageReporter: {
      'text-summary': null,
      json: __dirname.replace('\\', '/') + '/../reports/coverage-ts.json'
    }
  })
}
