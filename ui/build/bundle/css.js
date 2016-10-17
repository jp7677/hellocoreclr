'use strict'

const concat = require('gulp-concat')
const cleancss = require('gulp-clean-css')
const sourcemaps = require('gulp-sourcemaps')
const filenames = require('gulp-filenames')
const rev = require('gulp-rev')
const util = require('gulp-util')

exports.fn = function (gulp, paths, mode, done) {
  var srcCss = [
    paths.src + '**/css/bootstrap.css',
    paths.src + '**/css/bootstrap-theme.css',
    paths.src + '**/css/font-awesome.css'
  ]
  return gulp.src(srcCss)
    .pipe(!mode.production ? sourcemaps.init({loadMaps: true}) : util.noop())
    .pipe(concat('app-bundle.css'))
    .pipe(cleancss({keepSpecialComments: 0, sourceMap: false}))
    .pipe(mode.production ? rev() : util.noop())
    .pipe(filenames('cssbundle'))
    .pipe(!mode.production ? sourcemaps.write('.', {
      mapSources: function (sourcePath) {
        var extendedSourcePath = sourcePath
        if (sourcePath.indexOf('/') === -1) {
          extendedSourcePath = 'styles/' + sourcePath
          util.log('SourcePath within source map extended to:', util.colors.cyan(extendedSourcePath))
        }
        return extendedSourcePath
      }
    }) : util.noop())
    .pipe(gulp.dest(paths.wwwroot))
}
