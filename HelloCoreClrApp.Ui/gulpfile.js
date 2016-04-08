'use strict'

var gulp = require('gulp')
var rimraf = require('gulp-rimraf')
var tslint = require('gulp-tslint')
var ts = require('gulp-typescript')
var sourcemaps = require('gulp-sourcemaps')
var bowerfiles = require('main-bower-files')
var concat = require('gulp-concat')
var cssmin = require('gulp-cssmin')
var uglify = require('gulp-uglify')
var util = require('gulp-util')

var paths = {
  webroot: './wwwroot/'
}

paths.ts = paths.webroot + '**/*.ts'
paths.js = paths.webroot + 'app/**/*.js'
paths.jsMap = paths.webroot + 'app/**/*.js.map'
paths.specJs = paths.webroot + 'test/**/*.js'
paths.specJsMap = paths.webroot + 'test/**/*.js.map'
paths.minJs = paths.webroot + 'app/**/*.min.js'
paths.css = paths.webroot + 'css/**/*.css'
paths.minCss = paths.webroot + 'css/**/*.min.css'
paths.concatJsDest = paths.webroot + 'site.min.js'
paths.concatJsMapDest = paths.webroot + 'site.min.js.map'
paths.concatVendorJsDest = paths.webroot + 'vendor.min.js'
paths.concatVendorJsMapDest = paths.webroot + 'vendor.min.js.map'
paths.concatCssDest = paths.webroot + 'site.min.css'
paths.concatVendorCssDest = paths.webroot + 'vendor.min.css'
paths.concatVendorCssMapDest = paths.webroot + 'vendor.min.css.map'

var tsProject = ts.createProject('tsconfig.json')

gulp.task('clean:js', function (cb) {
  return gulp.src([
    paths.js,
    paths.minJs,
    paths.jsMap,
    paths.specJs,
    paths.specJsMap,
    paths.concatJsDest,
    paths.concatJsMapDest,
    paths.concatVendorJsDest,
    paths.concatVendorJsMapDest], { read: false })
    .pipe(rimraf())
})

gulp.task('clean:css', function (cb) {
  return gulp.src([
    paths.concatCssDest,
    paths.concatVendorCssDest,
    paths.concatVendorCssMapDest], { read: false })
    .pipe(rimraf())
})

gulp.task('clean', ['clean:js', 'clean:css'])

gulp.task('tslint', function (cb) {
  return gulp.src(paths.ts)
    .pipe(tslint())
    .pipe(tslint.report('verbose'))
})

gulp.task('tscompile', ['tslint', 'clean:js'], function (cb) {
  var tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))

  return tsResult.js
    .pipe(sourcemaps.write('.', {
      mapSources: function (sourcePath) {
        var truncatedSourcePath = sourcePath.substr(sourcePath.lastIndexOf('/') + 1)
        util.log('SourcePath within source map truncated to:', util.colors.cyan(truncatedSourcePath))
        return truncatedSourcePath
      }
    }))
    .pipe(gulp.dest(paths.webroot))
})

gulp.task('min:js', ['tscompile'], function () {
  gulp.src([paths.js, '!' + paths.minJs], { base: '.' })
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(concat(paths.concatJsDest))
    .pipe(sourcemaps.write())
    .pipe(sourcemaps.init())
    // Note that compress: true and mangle: true gives you uglier code,
    // but makes debugging in the browser debugger more difficult.
    .pipe(uglify({compress: false, mangle: false}))
    .pipe(sourcemaps.write('.', {
      mapSources: function (sourcePath) {
        var truncatedSourcePath = sourcePath.substr(paths.webroot.length - 2)
        util.log('SourcePath within source map truncated to:', util.colors.cyan(truncatedSourcePath))
        return truncatedSourcePath
      }
    }))
    .pipe(gulp.dest('.'))
})

gulp.task('min:vendorjs', ['clean:js'], function () {
  gulp.src(bowerfiles('**/*.js'), { base: '.' })
    .pipe(sourcemaps.init())
    .pipe(concat(paths.concatVendorJsDest))
    .pipe(sourcemaps.write())
    .pipe(sourcemaps.init())
    // Note that compress: true and mangle: true gives you uglier code,
    // but makes debugging in the browser debugger more difficult.
    .pipe(uglify({compress: false, mangle: false}))
    .pipe(sourcemaps.write('.', {
      mapSources: function (sourcePath) {
        var truncatedSourcePath = sourcePath.substr(paths.webroot.length - 2)
        util.log('SourcePath within source map truncated to:', util.colors.cyan(truncatedSourcePath))
        return truncatedSourcePath
      }
    }))
    .pipe(gulp.dest('.'))
})

gulp.task('min:css', ['clean:css'], function () {
  gulp.src([paths.css, '!' + paths.minCss])
    .pipe(concat(paths.concatCssDest))
    .pipe(cssmin())
    .pipe(gulp.dest('.'))
})

gulp.task('min:vendorcss', ['clean:css'], function () {
  gulp.src(bowerfiles('**/*.css', {overrides: {
    bootstrap: {
      main: ['./dist/css/bootstrap.css']
    }}}), { base: '.' })
    .pipe(concat(paths.concatVendorCssDest))
    .pipe(cssmin())
    .pipe(gulp.dest('.'))
})

gulp.task('min', ['min:js', 'min:vendorjs', 'min:css', 'min:vendorcss'])

gulp.task('build', ['min'])

gulp.task('default', ['build'])
