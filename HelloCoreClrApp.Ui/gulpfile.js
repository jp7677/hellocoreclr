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

paths.concatJsDest = paths.wwwroot + 'site.min.js'
paths.concatVendorJsDest = paths.wwwroot + 'vendor.min.js'
paths.concatCssDest = paths.wwwroot + 'site.min.css'
paths.concatVendorCssDest = paths.wwwroot + 'vendor.min.css'

var tsProject = ts.createProject('tsconfig.json')

gulp.task('clean', function (cb) {
  return gulp.src([
    paths.srcJs,
    paths.srcJsMap,
    paths.testJs,
    paths.testJsMap,
    paths.wwwroot], { read: false })
    .pipe(rimraf())
})

gulp.task('tslint', function (cb) {
  return gulp.src([paths.srcTs, paths.testTs])
    .pipe(tslint())
    .pipe(tslint.report('verbose'))
})

gulp.task('tscompile', ['tslint'], function (cb) {
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

gulp.task('min:vendorjs', ['clean'], function () {
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

gulp.task('min:css', ['clean'], function () {
  gulp.src(paths.srcCss)
    .pipe(sourcemaps.init())
    .pipe(concat(paths.concatCssDest))
    .pipe(cssmin())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('.'))
})

gulp.task('min:vendorcss', ['clean'], function () {
  gulp.src(bowerfiles('**/*.css',
    {overrides: {bootstrap: {main: ['./dist/css/bootstrap.css', './dist/fonts/*.*']}}}), { base: '.' })
    .pipe(sourcemaps.init())
    .pipe(concat(paths.concatVendorCssDest))
    .pipe(cssmin())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('.'))
})

gulp.task('assets', ['clean'], function () {
  gulp.src([paths.src + '**/*', '!' + paths.srcTs, '!' + paths.srcJs, '!' + paths.srcJsMap])
    .pipe(gulp.dest(paths.wwwroot))
})

gulp.task('vendorassets', ['clean'], function () {
  gulp.src(bowerfiles(['**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff', '**/*.woff2'],
    {overrides: {bootstrap: {main: ['./dist/css/bootstrap.css', './dist/fonts/*.*']}}}), { base: '.' })
    .pipe(flatten({includeParents: -1}))
    .pipe(gulp.dest(paths.wwwroot))
})

gulp.task('min', ['min:js', 'min:vendorjs', 'min:css', 'min:vendorcss'])

gulp.task('build', ['min', 'assets', 'vendorassets'])

gulp.task('default', ['build'])
