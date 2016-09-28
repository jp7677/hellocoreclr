'use strict'

const filter = require('gulp-filter')
const ts = require('gulp-typescript')
const sourcemaps = require('gulp-sourcemaps')
const path = require('path')
const util = require('gulp-util')

exports.dep = ['clean:js']
exports.fn = function (gulp, paths, mode, done) {
  var tsProject = ts.createProject('tsconfig.json')
  var tsResult = tsProject.src()
    .pipe(mode.production ? filter(['**/*', '!test/**']) : util.noop())
    .pipe(!mode.production ? sourcemaps.init() : util.noop())
    .pipe(tsProject())

  return tsResult.js
    .pipe(!mode.production ? sourcemaps.write('.', {
      mapSources: function (sourcePath) {
        var truncatedSourcePath = sourcePath.substr(sourcePath.lastIndexOf(path.sep) + 1)
        util.log('SourcePath within source map truncated to:', util.colors.cyan(truncatedSourcePath))
        return truncatedSourcePath
      }
    }) : util.noop())
    .pipe(gulp.dest('.'))
}
