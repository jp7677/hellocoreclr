module.exports = function (config) {
  'use strict'

  config.set({
    frameworks: ['jspm', 'mocha', 'chai', 'sinon'],

    jspm: {
      config: 'src/jspm.conf.js',
      loadFiles: [
        'node_modules/core-js/client/core.js',
        'test/**/*.spec.js'
      ],
      serveFiles: [
        'src/**/*.js',
        'test/stubs.js'
      ],
      meta: {
        'src/*': { format: 'register' }
      }
    },
    proxies: {
      '/node_modules/': '/base/node_modules/',
      '/jspm_packages/': '/base/src/jspm_packages/',
      '/src/': '/base/src/',
      '/test/': '/base/test/'
    },

    autoWatchBatchDelay: 10000,
    singleRun: true,
    browsers: ['PhantomJS'],
    captureTimeout: 2000,
    browserDisconnectTimeout: 2000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 10000,

    preprocessors: {
      'src/!(jspm.conf).js': ['coverage', 'sourcemap'],
      'src/app/**/*.js': ['coverage', 'sourcemap']
    },
    reporters: ['progress'],
    coverageReporter: {
      type: 'in-memory',
      includeAllSources: true
    },
    remapCoverageReporter: {
      'text-summary': null,
      json: 'reports/coverage-ts.json'
    }
  })
}
