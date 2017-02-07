'use strict'

const ts = require('gulp-typescript')
const sourcemaps = require('gulp-sourcemaps')
const path = require('path')
const util = require('gulp-util')

const tsProject = ts.createProject('test-e2e/tsconfig.json')

exports.dep = ['clean:e2e']
exports.fn = (gulp, paths, argv, done) => {
  if (argv.production) {
    util.log('Skipping \'' + util.colors.cyan('compile:e2e') + '\'')
    done()
    return
  }

  let tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())

  return tsResult.js
    .pipe(sourcemaps.write('.', {
      mapSources: (sourcePath) => {
        return sourcePath.substr(sourcePath.lastIndexOf(path.sep) + 1)
      }
    }))
    .pipe(gulp.dest(paths.testE2e))
}
