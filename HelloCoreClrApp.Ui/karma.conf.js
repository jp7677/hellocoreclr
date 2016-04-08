module.exports = function (config) {
  'use strict'

  config.set({
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      {pattern: 'bower_components/angular/angular.js', instrument: false},
      {pattern: 'node_modules/angular-mocks/angular-mocks.js', instrument: false},
      'wwwroot/app/**/*.js',
      'wwwroot/test/stubs.js',
      'wwwroot/test/**/*.spec.js'
    ],

    singleRun: true,
    browsers: ['PhantomJS']
  })
}
