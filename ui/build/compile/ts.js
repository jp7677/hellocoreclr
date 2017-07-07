'use strict'

const {argv, paths} = require('../../settings')
const filter = require('gulp-filter')
const ts = require('gulp-typescript')
const sourcemaps = require('gulp-sourcemaps')
const path = require('path')
const util = require('gulp-util')

const tsProject = ts.createProject('tsconfig.json')

exports.deps = ['clean:js']
exports.fn = (gulp, done) => {
  let tsResult = tsProject.src()
    .pipe(argv.production ? filter(['**/*', '!test/**']) : util.noop())
    .pipe(!argv.production ? sourcemaps.init() : util.noop())
    .pipe(tsProject())

  return tsResult.js
    .pipe(!argv.production ? sourcemaps.write('.', {
      mapSources: (sourcePath) => {
        return sourcePath.substr(sourcePath.lastIndexOf(path.sep) + 1)
      }
    }) : util.noop())
    .pipe(gulp.dest('.'))
}
