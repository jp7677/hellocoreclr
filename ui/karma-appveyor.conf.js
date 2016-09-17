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
        'src/**/*.html',
        'test/stubs.js'
      ]
    },
    proxies: {
      '/jspm_packages/': '/base/src/jspm_packages/',
      '/test/': '/base/test/',
      '/src/': '/base/src/'
    },

    autoWatchBatchDelay: 10000,
    singleRun: true,
    browsers: ['PhantomJS'],

    preprocessors: {
      'src/app/**/*.js': ['coverage', 'sourcemap']
    },
    reporters: ['progress', 'coverage', 'appveyor'],
    coverageReporter: {
      dir: '../reports',
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
