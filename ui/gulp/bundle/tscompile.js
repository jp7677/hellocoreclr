'use strict'

const iif = require('gulp-if')
const ts = require('gulp-typescript')
const sourcemaps = require('gulp-sourcemaps')
const util = require('gulp-util')

module.exports = {
  dep: ['clean:js'],
  fn: function (gulp, paths, production, done) {
    var tsProject = ts.createProject('tsconfig.json')
    var tsResult = tsProject.src()
        .pipe(iif(!production, sourcemaps.init()))
        .pipe(ts(tsProject))

    return tsResult.js
        .pipe(iif(!production, sourcemaps.write('.', {
          mapSources: function (sourcePath) {
            var truncatedSourcePath = sourcePath.substr(sourcePath.lastIndexOf('/') + 1)
            util.log('SourcePath within source map truncated to:', util.colors.cyan(truncatedSourcePath))
            return truncatedSourcePath
          }
        })))
        .pipe(gulp.dest('.'))
  }
}
