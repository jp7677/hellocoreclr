module.exports = function (wallaby) {
  'use strict'

  return {
    files: [
      {pattern: 'node_modules/chai/chai.js', instrument: false},
      {pattern: 'node_modules/sinon/pkg/sinon.js', instrument: false},
      {pattern: 'bower_components/jquery/dist/jquery.js', instrument: false},
      {pattern: 'bower_components/toastr/toastr.js', instrument: false},
      {pattern: 'bower_components/angular/angular.js', instrument: false},
      {pattern: 'node_modules/angular-mocks/angular-mocks.js', instrument: false},
      'src/app/**/*.ts',
      'test/stubs.ts'
    ],
    tests: [
      'test/**/*.spec.ts'
    ],
    testFramework: 'mocha'
  }
}
