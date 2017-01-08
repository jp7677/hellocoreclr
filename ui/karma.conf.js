module.exports = (config) => {
  'use strict'

  config.set({
    logLevel: 'warn',
    frameworks: ['jspm', 'mocha', 'chai', 'sinon'],

    jspm: {
      config: 'src/jspm.conf.js',
      loadFiles: [
        'node_modules/core-js/client/core.js',
        'test/**/!(e2e)*.spec.js'
      ],
      serveFiles: [
        'src/jspm_packages/*.js',
        'src/app/**/*.js',
        'test/stubs.js'
      ]
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
