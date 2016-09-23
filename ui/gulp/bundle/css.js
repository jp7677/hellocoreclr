'use strict'

const iif = require('gulp-if')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const sourcemaps = require('gulp-sourcemaps')
const filenames = require('gulp-filenames')
const flatten = require('gulp-flatten')
const hash = require('gulp-hash-filename')
const util = require('gulp-util')

exports.fn = function (gulp, paths, mode, done) {
  var srcCss = [
    paths.src + '**/bootstrap.css',
    paths.src + '**/bootstrap-theme.css',
    paths.src + '**/font-awesome.css',
    paths.src + '**/toastr.css',
    paths.src + 'styles.css'
  ]
  return gulp.src(srcCss)
    .pipe(iif(!mode.production, sourcemaps.init()))
    .pipe(concat(paths.wwwroot + 'app-bundle.css'))
    .pipe(cssmin())
    .pipe(iif(mode.production, hash({'format': '{hash}{ext}'})))
    .pipe(filenames('cssbundle'))
    .pipe(iif(!mode.production, sourcemaps.write('.', {
      mapSources: function (sourcePath) {
        var extendedSourcePath = paths.src.substr(2) + sourcePath
        util.log('SourcePath within source map extended to:', util.colors.cyan(extendedSourcePath))
        return extendedSourcePath
      }
    })))
    .pipe(flatten())
    .pipe(gulp.dest('wwwroot/'))
}
