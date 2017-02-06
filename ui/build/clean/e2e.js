'use strict'

const del = require('del')
const util = require('gulp-util')

exports.fn = (gulp, paths, argv, done) => {
  if (argv.production) {
    util.log('Skipping \'' + util.colors.cyan('clean:e2e') + '\'')
    done()
    return
  }
  return del([paths.testE2e + '**/*.{js,js.map}'])
}
