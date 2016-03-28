module.exports = function (wallaby) {
  'use strict'

  return {
    files: [
      {pattern: 'node_modules/chai/chai.js', instrument: false},
      {pattern: 'node_modules/sinon/lib/sinon.js', instrument: false},
      {pattern: 'node_modules/sinon/lib/sinon/util/core.js', instrument: false},
      {pattern: 'node_modules/sinon/lib/sinon/extend.js', instrument: false},
      {pattern: 'node_modules/sinon/lib/sinon/walk.js', instrument: false},
      {pattern: 'node_modules/sinon/lib/sinon/typeOf.js', instrument: false},
      {pattern: 'node_modules/sinon/lib/sinon/times_in_words.js', instrument: false},
      {pattern: 'node_modules/sinon/lib/sinon/spy.js', instrument: false},
      {pattern: 'node_modules/sinon/lib/sinon/call.js', instrument: false},
      {pattern: 'node_modules/sinon/lib/sinon/behavior.js', instrument: false},
      {pattern: 'node_modules/sinon/lib/sinon/stub.js', instrument: false},
      {pattern: 'node_modules/sinon/lib/sinon/mock.js', instrument: false},
      {pattern: 'node_modules/sinon/lib/sinon/collection.js', instrument: false},
      {pattern: 'node_modules/sinon/lib/sinon/assert.js', instrument: false},
      {pattern: 'node_modules/sinon/lib/sinon/sandbox.js', instrument: false},
      {pattern: 'node_modules/sinon/lib/sinon/test.js', instrument: false},
      {pattern: 'node_modules/sinon/lib/sinon/test_case.js', instrument: false},
      {pattern: 'node_modules/sinon/lib/sinon/match.js', instrument: false},
      {pattern: 'node_modules/sinon/lib/sinon/format.js', instrument: false},
      {pattern: 'node_modules/sinon/lib/sinon/log_error.js', instrument: false},
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
