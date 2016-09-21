module.exports = function (config) {
  'use strict'

  config.set({
    frameworks: ['jspm', 'mocha', 'chai', 'sinon'],

    jspm: {
      config: 'src/jspm.conf.js',
      loadFiles: [
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
