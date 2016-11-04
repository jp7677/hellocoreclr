'use strict'

const filter = require('gulp-filter')
const ts = require('gulp-typescript')
const sourcemaps = require('gulp-sourcemaps')
const path = require('path')
const util = require('gulp-util')

const tsProject = ts.createProject('tsconfig.json')

exports.dep = ['clean:js']
exports.fn = function (gulp, paths, mode, done) {
  var tsResult = tsProject.src()
    .pipe(mode.production ? filter(['**/*', '!test/**']) : util.noop())
    .pipe(!mode.production ? sourcemaps.init() : util.noop())
    .pipe(tsProject())

  return tsResult.js
    .pipe(!mode.production ? sourcemaps.write('.', {
      mapSources: function (sourcePath) {
        return sourcePath.substr(sourcePath.lastIndexOf(path.sep) + 1)
      }
    }) : util.noop())
    .pipe(gulp.dest('.'))
}
