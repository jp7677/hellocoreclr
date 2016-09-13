module.exports = function (config) {
  'use strict'

  config.set({
    frameworks: ['systemjs', 'mocha', 'chai', 'sinon'],

    files: [
      'src/app/**/*.js',
      'test/stubs.js',
      'test/*.spec.js',
      'test/**/*.spec.js'
    ],

    systemjs: {
      configFile: 'jspm.conf.js',
      serveFiles: [
        'jspm_packages/**/*.js'
      ],
      config: {
        paths: {
          'systemjs': 'node_modules/systemjs/dist/system.js',
          'system-polyfills': 'node_modules/systemjs/dist/system-polyfills.js'
        }
      }
    },

    autoWatchBatchDelay: 10000,
    singleRun: true,
    browsers: ['PhantomJS']
  })
}
