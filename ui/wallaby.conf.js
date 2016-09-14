module.exports = function (wallaby) {
  'use strict'

  return {
    files: [
      {pattern: 'src/jspm_packages/system.js', instrument: false},
      {pattern: 'src/jspm.conf.js', instrument: false},
      {pattern: 'src/app/**/*.ts', load: false},
      {pattern: 'test/stubs.ts', load: false}
    ],
    tests: [
      {pattern: 'test/**/*.spec.ts', load: false}
    ],

    // telling wallaby to serve jspm_packages project folder
    // as is from wallaby web server
    middleware: (app, express) => {
      app.use('/src/jspm_packages',
              express.static('src/jspm_packages'))
      app.use('/jspm_packages',
              express.static('src/jspm_packages'))
    },

    setup: function (wallaby) {
      // Preventing wallaby from starting the test run
      wallaby.delayStart()

      var promises = []
      for (var i = 0, len = wallaby.tests.length; i < len; i++) {
        promises.push(System['import'](wallaby.tests[i]))
      }

      // starting wallaby test run when everything required is loaded
      Promise.all(promises).then(function () {
        wallaby.start()
      }).catch(function (e) { setTimeout(function () { throw e }, 0) })
    }
  }
}
