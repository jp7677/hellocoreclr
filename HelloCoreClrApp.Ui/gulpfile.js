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
var flatten = require('gulp-flatten')
var util = require('gulp-util')
var watch = require('gulp-watch')
var batch = require('gulp-batch')

var paths = {
  wwwroot: './wwwroot/',
  src: './src/',
  test: './test/'
}

paths.srcTs = paths.src + '**/*.ts'
paths.testTs = paths.test + '**/*.ts'
paths.srcCss = paths.src + '**/*.css'
paths.srcJs = paths.src + '**/*.js'
paths.testJs = paths.test + '**/*.js'
paths.srcJsMap = paths.src + '**/*.js.map'
paths.testJsMap = paths.test + '**/*.js.map'
paths.assets = paths.wwwroot + '**/*.{html,ico}' // Far from perfect :(

paths.concatJsDest = paths.wwwroot + 'js/site.min.js'
paths.concatVendorJsDest = paths.wwwroot + 'js/vendor.min.js'
paths.concatCssDest = paths.wwwroot + 'css/site.min.css'
paths.concatVendorCssDest = paths.wwwroot + 'css/vendor.min.css'
paths.vendorAssets = paths.wwwroot + '**/*.{eot,svg,ttf,woff,woff2}' // Far from perfect :(

var tsProject = ts.createProject('tsconfig.json')
var bootstrapFiles = ['./dist/css/bootstrap.css', './dist/css/bootstrap-theme.css', './dist/fonts/*.*']
var fontawesomeFiles = ['./css/font-awesome.css', './fonts/*.*']

gulp.task('clean:js', function () {
  return gulp.src([
    paths.srcJs,
    paths.srcJsMap,
    paths.testJs,
    paths.testJsMap,
    paths.concatJsDest + '*'], { read: false })
    .pipe(rimraf())
})

gulp.task('clean:css', function () {
  return gulp.src(paths.concatCssDest + '*', { read: false })
    .pipe(rimraf())
})

gulp.task('clean:assets', function () {
  return gulp.src(paths.assets, { read: false })
    .pipe(rimraf())
})

gulp.task('clean:vendor', function () {
  return gulp.src([
    paths.concatVendorJsDest + '*',
    paths.concatVendorCssDest + '*',
    paths.vendorAssets], { read: false })
    .pipe(rimraf())
})

gulp.task('clean:all', function () {
  return gulp.src(paths.wwwroot, { read: false })
    .pipe(rimraf())
})

gulp.task('tslint', function () {
  return gulp.src([paths.srcTs, paths.testTs])
    .pipe(tslint())
    .pipe(tslint.report('verbose'))
})

gulp.task('tscompile', ['tslint', 'clean:js'], function () {
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
    .pipe(gulp.dest('.'))
})

gulp.task('min:js', ['tscompile'], function () {
  gulp.src([paths.srcJs], { base: '.' })
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(concat(paths.concatJsDest))
    .pipe(sourcemaps.write())
    .pipe(sourcemaps.init())
    // Note that compress: true and mangle: true gives you uglier code,
    // but makes debugging in the browser debugger more difficult.
    .pipe(uglify({compress: false, mangle: false}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('.'))
})

gulp.task('min:css', ['clean:css'], function () {
  gulp.src(paths.srcCss)
    .pipe(sourcemaps.init())
    .pipe(concat(paths.concatCssDest))
    .pipe(cssmin())
    .pipe(sourcemaps.write('.', {
      mapSources: function (sourcePath) {
        var extendedSourcePath = paths.src.substr(2) + sourcePath
        util.log('SourcePath within source map extended to:', util.colors.cyan(extendedSourcePath))
        return extendedSourcePath
      }
    }))
    .pipe(gulp.dest('.'))
})

gulp.task('assets', ['clean:assets'], function () {
  gulp.src([paths.src + '**/*', '!' + paths.srcTs, '!' + paths.srcJs, '!' + paths.srcJsMap, '!' + paths.srcCss])
    .pipe(gulp.dest(paths.wwwroot))
})

gulp.task('min:vendorjs', ['clean:vendor'], function () {
  gulp.src(bowerfiles('**/*.js'), { base: '.' })
    .pipe(sourcemaps.init())
    .pipe(concat(paths.concatVendorJsDest))
    .pipe(sourcemaps.write())
    .pipe(sourcemaps.init())
    // Note that compress: true and mangle: true gives you uglier code,
    // but makes debugging in the browser debugger more difficult.
    .pipe(uglify({compress: false, mangle: false}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('.'))
})

gulp.task('min:vendorcss', ['clean:vendor'], function () {
  gulp.src(bowerfiles('**/*.css',
    {overrides: {
      'bootstrap': {main: bootstrapFiles},
      'font-awesome': {main: fontawesomeFiles}
    }}), { base: '.' })
    .pipe(sourcemaps.init())
    .pipe(concat(paths.concatVendorCssDest))
    .pipe(cssmin())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('.'))
})

gulp.task('vendorassets', ['clean:vendor'], function () {
  gulp.src(bowerfiles(['**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff', '**/*.woff2'],
    {overrides: {
      'bootstrap': {main: bootstrapFiles},
      'font-awesome': {main: fontawesomeFiles}
    }}), { base: '.' })
    .pipe(flatten({includeParents: -1}))
    .pipe(gulp.dest(paths.wwwroot))
})

gulp.task('build:app', ['min:js', 'min:css', 'assets'])

gulp.task('build:vendor', ['min:vendorjs', 'min:vendorcss', 'vendorassets'])

gulp.task('build', ['clean:all'], function (cb) {
  gulp.start('build:app', cb)
  gulp.start('build:vendor', cb)
})

gulp.task('default', ['build'])

// Watch tasks

gulp.task('watch:js', function () {
  watch(paths.srcTs, batch(function (events, done) {
    gulp.start('min:js', done)
  }))
})

gulp.task('watch:css', function () {
  watch(paths.srcCss, batch(function (events, done) {
    gulp.start('min:css', done)
  }))
})

gulp.task('watch:assets', function () {
  watch([paths.src + '**/*', '!' + paths.srcTs, '!' + paths.srcJs, '!' + paths.srcJsMap, '!' + paths.srcCss], batch(function (events, done) {
    gulp.start('assets', done)
  }))
})

gulp.task('watch', ['watch:js', 'watch:css', 'watch:assets'])
