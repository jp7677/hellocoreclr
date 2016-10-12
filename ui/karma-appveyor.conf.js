module.exports = function (config) {
  'use strict'

  config.set({
    frameworks: ['jspm', 'mocha', 'chai', 'sinon'],

    jspm: {
      config: 'src/jspm.conf.js',
      loadFiles: [
        'node_modules/es6-shim/es6-shim.js',
        'test/**/*.spec.js'
      ],
      serveFiles: [
        'node_modules/es6-shim/es6-shim.js',
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

    preprocessors: {
      'src/!(jspm.conf).js': ['coverage', 'sourcemap'],
      'src/app/**/*.js': ['coverage', 'sourcemap']
    },
    reporters: ['progress', 'coverage', 'appveyor'],
    coverageReporter: {
      dir: '../reports',
      includeAllSources: true,
      reporters: [
        {
          type: 'json',
          subdir: '.',
          file: 'coverage-js.json'
        }
      ]
    }
  })
}
