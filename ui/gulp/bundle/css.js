'use strict'

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
    paths.src + 'css/*.css'
  ]
  return gulp.src(srcCss)
    .pipe(!mode.production ? sourcemaps.init() : util.noop())
    .pipe(concat(paths.wwwroot + 'app-bundle.css'))
    .pipe(cssmin())
    .pipe(mode.production ? hash({'format': '{hash}{ext}'}) : util.noop())
    .pipe(filenames('cssbundle'))
    .pipe(!mode.production ? sourcemaps.write('.', {
      mapSources: function (sourcePath) {
        var prefix = ''
        if (sourcePath.indexOf('/') === -1) {
          prefix = 'css/'
        }
        var extendedSourcePath = paths.src.substr(2) + prefix + sourcePath
        util.log('SourcePath within source map extended to:', util.colors.cyan(extendedSourcePath))
        return extendedSourcePath
      }
    }) : util.noop())
    .pipe(flatten())
    .pipe(gulp.dest('wwwroot/'))
}
