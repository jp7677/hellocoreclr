module.exports = function(wallaby) {
  return {
    files: [
      {pattern: 'node_modules/chai/chai.js', instrument: false},
      {pattern: 'wwwroot/lib/angular/angular.js', instrument: false},
      'wwwroot/app/**/*.ts'
    ],
    tests: [
      'wwwroot/test/**/*.spec.ts'
    ]
  }
}
