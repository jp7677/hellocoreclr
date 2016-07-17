module.exports = function (config) {
  'use strict'

  config.set({
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      {pattern: 'bower_components/jquery/dist/jquery.js', instrument: false},
      {pattern: 'bower_components/toastr/toastr.js', instrument: false},
      {pattern: 'bower_components/angular/angular.js', instrument: false},
      {pattern: 'node_modules/angular-mocks/angular-mocks.js', instrument: false},
      'src/app/**/*.js',
      'test/stubs.js',
      'test/**/*.spec.js'
    ],

    autoWatchBatchDelay: 10000,
    singleRun: true,
    browsers: ['PhantomJS'],

    preprocessors: {
      'src/app/**/*.js': ['coverage']
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: '../reports',
      reporters: [
        {
          type: 'lcovonly',
          subdir: '.',
          file: 'coverage-js.info'
        }
      ]
    }
  })
}
