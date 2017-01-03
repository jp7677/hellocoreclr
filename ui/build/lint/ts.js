'use strict'

const util = require('gulp-util')

exports.fn = function (gulp, paths, argv, done) {
  if (argv.production) {
    util.log('Skipping \'' + util.colors.cyan('gulp-tslint') + '\'')
    done()
    return
  }

  var consoleFormatter = function () {
    consoleFormatter.prototype.format = function (results) {
      results.forEach(function (element) {
        var message = '[' + util.colors.cyan('lint') + '] ' +
          util.colors.red('error') + ' ' + element.fileName +
          '[' + (element.startPosition.lineAndCharacter.line + 1) + ', ' + (element.startPosition.lineAndCharacter.character + 1) + ']: ' +
          element.failure
        util.log(message)
      })
    }
  }

  var tslint = require('gulp-tslint')
  return gulp.src([paths.src + '**/*.ts', paths.test + '**/*.ts', '!' + paths.jspmPackages])
    .pipe(tslint({formatter: consoleFormatter}))
    .pipe(tslint.report({emitError: false}))
}
