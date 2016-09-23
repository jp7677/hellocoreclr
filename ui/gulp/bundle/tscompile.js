'use strict'

const iif = require('gulp-if')
const filter = require('gulp-filter')
const ts = require('gulp-typescript')
const sourcemaps = require('gulp-sourcemaps')
const util = require('gulp-util')

exports.dep = ['clean:js']
exports.fn = function (gulp, paths, mode, done) {
  var tsProject = ts.createProject('tsconfig.json')
  var tsResult = tsProject.src()
    .pipe(iif(mode.production, filter(['**/*.ts', '!**/*.spec.ts', '!**/stubs.ts'])))
    .pipe(iif(!mode.production, sourcemaps.init()))
    .pipe(ts(tsProject))

  return tsResult.js
    .pipe(iif(!mode.production, sourcemaps.write('.', {
      mapSources: function (sourcePath) {
        var truncatedSourcePath = sourcePath.substr(sourcePath.lastIndexOf('/') + 1)
        util.log('SourcePath within source map truncated to:', util.colors.cyan(truncatedSourcePath))
        return truncatedSourcePath
      }
    })))
    .pipe(gulp.dest('.'))
}
