'use strict'

const concat = require('gulp-concat')
const cleancss = require('gulp-clean-css')
const sourcemaps = require('gulp-sourcemaps')
const filenames = require('gulp-filenames')
const hash = require('gulp-hash-filename')
const util = require('gulp-util')

exports.fn = function (gulp, paths, mode, done) {
  var srcCss = [
    paths.src + '**/css/bootstrap.css',
    paths.src + '**/css/bootstrap-theme.css',
    paths.src + '**/css/font-awesome.css',
    paths.src + 'css/*'
  ]
  return gulp.src(srcCss)
    .pipe(!mode.production ? sourcemaps.init({loadMaps: true}) : util.noop())
    .pipe(concat('app-bundle.css'))
    .pipe(cleancss({keepSpecialComments: 0, sourceMap: false}))
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
    .pipe(gulp.dest(paths.wwwroot))
}
