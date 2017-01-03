'use strict'

const filter = require('gulp-filter')
const ts = require('gulp-typescript')
const sourcemaps = require('gulp-sourcemaps')
const path = require('path')
const util = require('gulp-util')

const tsProject = ts.createProject('tsconfig.json')

exports.dep = ['clean:js']
exports.fn = (gulp, paths, argv, done) => {
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
