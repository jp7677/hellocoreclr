'use strict'

const {argv, paths} = require('../../settings')
const util = require('gulp-util')

exports.fn = (gulp, done) => {
  if (argv.production) {
    util.log('Skipping \'' + util.colors.cyan('lint:ts') + '\'')
    done()
    return
  }

  const consoleFormatter = function () {
    consoleFormatter.prototype.format = (results) => {
      results.forEach((element) => {
        let message = '[' + util.colors.cyan('lint') + '] ' +
          util.colors.red('error') + ' ' + element.fileName +
          '[' + (element.startPosition.lineAndCharacter.line + 1) + ', ' + (element.startPosition.lineAndCharacter.character + 1) + ']: ' +
          element.failure
        util.log(message)
      })
    }
  }

  let lintFiles = [
    paths.src + '**/*.ts',
    '!' + paths.jspmPackages,
    paths.test + '**/*.ts',
    paths.testE2e + '**/*.ts',
    '!' + paths.testE2e + 'custom_typings/*.ts']

  const tslint = require('gulp-tslint')
  return gulp.src(lintFiles)
    .pipe(tslint({formatter: consoleFormatter}))
    .pipe(tslint.report({emitError: false}))
}
