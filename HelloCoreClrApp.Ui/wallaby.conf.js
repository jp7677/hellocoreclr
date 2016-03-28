module.exports = function (wallaby) {
  'use strict'

  return {
    files: [
      {pattern: 'node_modules/chai/chai.js', instrument: false},
      {pattern: 'wwwroot/lib/angular/angular.js', instrument: false},
      {pattern: 'node_modules/angular-mocks/angular-mocks.js', instrument: false},
      'wwwroot/app/**/*.ts'
    ],
    tests: [
      'wwwroot/test/**/*.spec.ts'
    ],
    testFramework: 'mocha'
  }
}
