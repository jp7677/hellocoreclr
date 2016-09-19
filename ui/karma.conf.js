module.exports = function (config) {
  'use strict'

  config.set({
    frameworks: ['jspm', 'mocha', 'chai', 'sinon'],

    jspm: {
      config: 'src/jspm.conf.js',
      loadFiles: [
        'src/app.js',
        'src/main.js',
        'test/**/*.spec.js'
      ],
      serveFiles: [
        'src/**/*.js',
        'src/**/*.html',
        'test/stubs.js'
      ],
      meta: {
        'src/*': { format: 'register' }
      }
    },
    proxies: {
      '/jspm_packages/': '/base/src/jspm_packages/',
      '/test/': '/base/test/',
      '/src/': '/base/src/',
      '/app/': '/base/src/app/'
    },

    autoWatchBatchDelay: 10000,
    singleRun: true,
    browsers: ['PhantomJS']
  })
}
