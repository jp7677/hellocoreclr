'use strict'

var gulp = require('gulp')
var run = require('run-sequence')
var iif = require('gulp-if')
var ts = require('gulp-typescript')
var sourcemaps = require('gulp-sourcemaps')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var cssmin = require('gulp-cssmin')
var htmlreplace = require('gulp-html-replace')
var htmlmin = require('gulp-htmlmin')
var image = require('gulp-image-optimization')
var bowerfiles = require('main-bower-files')
var flatten = require('gulp-flatten')
var util = require('gulp-util')
var del = require('del')
var path = require('path')

var paths = {
  wwwroot: './wwwroot/',
  src: './src/',
  test: './test/'
}

paths.srcTs = paths.src + '**/*.ts'
paths.testTs = paths.test + '**/*.ts'
paths.srcJs = paths.src + '**/*.js'
paths.srcJsMap = paths.src + '**/*.js.map'
paths.testJs = paths.test + '**/*.js'
paths.testJsMap = paths.test + '**/*.js.map'
paths.srcCss = paths.src + '**/*.css'
paths.srcHtml = paths.src + '**/*.html'
paths.srcImage = paths.src + '**/*.{png,jpg,gif,svg}'
paths.srcAssets = paths.src + '**/*.ico'

paths.concatJsDest = paths.wwwroot + 'js/site.min.js'
paths.concatCssDest = paths.wwwroot + 'css/site.min.css'
paths.htmlDest = paths.wwwroot + '**/*.html'
paths.imageDest = paths.wwwroot + '**/*.{png,jpg,gif,svg}'
paths.assetsDest = paths.wwwroot + '**/*.{ico}'

paths.concatVendorJsDest = paths.wwwroot + 'js/vendor.min.js'
paths.concatVendorCssDest = paths.wwwroot + 'css/vendor.min.css'
var vendorExtensions = '**/*.{eot,svg,ttf,woff,woff2}'
paths.vendorAssets = paths.wwwroot + vendorExtensions // Far from perfect :(

var tsProject = ts.createProject('tsconfig.json')
var bootstrapFiles = ['./dist/css/bootstrap.css', './dist/css/bootstrap-theme.css', './dist/fonts/*.*']
var fontawesomeFiles = ['./css/font-awesome.css', './fonts/*.*']
var production = false

gulp.task('clean:js', function () {
  return del([
    paths.srcJs,
    paths.srcJsMap,
    paths.testJs,
    paths.testJsMap,
    paths.concatJsDest + '*'])
})

gulp.task('clean:css', function () {
  return del(paths.concatCssDest + '*')
})

gulp.task('clean:html', function () {
  return del(paths.htmlDest)
})

gulp.task('clean:image', function () {
  return del(paths.imageDest)
})

gulp.task('clean:assets', function () {
  return del(paths.assetsDest)
})

gulp.task('clean:vendor', function () {
  return del([
    paths.concatVendorJsDest + '*',
    paths.concatVendorCssDest + '*',
    paths.vendorAssets])
})

gulp.task('clean:dest', function () {
  return del(paths.wwwroot)
})

gulp.task('lint:ts', function (done) {
  if (production) {
    util.log('Skipping \'' + util.colors.cyan('gulp-tslint') + '\'')
    done()
    return
  }

  var tslint = require('gulp-tslint')
  return gulp.src([paths.srcTs, paths.testTs])
    .pipe(tslint())
    .pipe(tslint.report('verbose', {emitError: false}))
})

gulp.task('tscompile', ['lint:ts', 'clean:js'], function () {
  var tsResult = tsProject.src()
    .pipe(iif(!production, sourcemaps.init()))
    .pipe(ts(tsProject))

  return tsResult.js
    .pipe(iif(!production, sourcemaps.write('.', {
      mapSources: function (sourcePath) {
        var truncatedSourcePath = sourcePath.substr(sourcePath.lastIndexOf('/') + 1)
        util.log('SourcePath within source map truncated to:', util.colors.cyan(truncatedSourcePath))
        return truncatedSourcePath
      }
    })))
    .pipe(gulp.dest('.'))
})

gulp.task('min:js', ['tscompile'], function () {
  return gulp.src([paths.srcJs], { base: '.' })
    .pipe(iif(!production, sourcemaps.init({loadMaps: true})))
    .pipe(concat(paths.concatJsDest))
    .pipe(iif(!production, sourcemaps.write()))
    .pipe(iif(!production, sourcemaps.init()))
    // Note that compress: true and mangle: true gives you uglier code,
    // but makes debugging in the browser debugger more difficult.
    .pipe(uglify({compress: production, mangle: production}))
    .pipe(iif(!production, sourcemaps.write('.')))
    .pipe(gulp.dest('.'))
})

gulp.task('lint:css', function (done) {
  if (production) {
    util.log('Skipping \'' + util.colors.cyan('gulp-stylelint') + '\'')
    done()
    return
  }

  var consoleFormatter = function (results) {
    results.forEach(function (element) {
      var file = path.relative(path.join(process.cwd(), paths.src), element.source)
      element.warnings.forEach(function (warning) {
        var message = '[' + util.colors.cyan('gulp-stylelint') + '] ' +
          util.colors.red(warning.severity) + ' ' + file +
          '[' + warning.line + ', ' + warning.column + ']: ' + warning.text
        util.log(message)
      })
    })
  }

  var stylelint = require('gulp-stylelint')
  return gulp.src(paths.srcCss)
    .pipe(stylelint({
      failAfterError: false,
      reporters: [
        {formatter: consoleFormatter}
      ]
    }))
})

gulp.task('min:css', ['lint:css', 'clean:css'], function () {
  return gulp.src(paths.srcCss)
    .pipe(iif(!production, sourcemaps.init()))
    .pipe(concat(paths.concatCssDest))
    .pipe(cssmin())
    .pipe(iif(!production, sourcemaps.write('.', {
      mapSources: function (sourcePath) {
        var extendedSourcePath = paths.src.substr(2) + sourcePath
        util.log('SourcePath within source map extended to:', util.colors.cyan(extendedSourcePath))
        return extendedSourcePath
      }
    })))
    .pipe(gulp.dest('.'))
})

gulp.task('lint:html', function (done) {
  if (production) {
    util.log('Skipping \'' + util.colors.cyan('gulp-htmlhint') + '\'')
    done()
    return
  }

  var consoleReporter = function (results) {
    results.htmlhint.messages.forEach(function (warning) {
      var file = path.relative(path.join(process.cwd(), paths.src), warning.file)
      var message = '[' + util.colors.cyan('gulp-htmlhint') + '] ' +
              util.colors.red(warning.error.type) + ' ' + file +
              '[' + warning.error.line + ', ' + warning.error.col + ']: ' + warning.error.message
      util.log(message)
    })
  }

  var htmlhint = require('gulp-htmlhint')
  return gulp.src(paths.srcHtml)
    .pipe(htmlhint())
    .pipe(htmlhint.reporter(consoleReporter))
})

gulp.task('min:html', ['lint:html', 'clean:html'], function () {
  return gulp.src(paths.srcHtml)
    .pipe(htmlreplace({
      'vendorcss': 'css/vendor.min.css',
      'appcss': 'css/site.min.css',
      'vendorjs': 'js/vendor.min.js',
      'appjs': 'js/site.min.js'
    }))
    .pipe(htmlmin({
      collapseWhitespace: production,
      removeComments: production,
      sortAttributes: production,
      sortClassName: production
    }))
    .pipe(gulp.dest(paths.wwwroot))
})

gulp.task('min:image', ['clean:image'], function () {
  return gulp.src(paths.srcImage)
    .pipe(image({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(paths.wwwroot))
})

gulp.task('assets', ['clean:assets'], function () {
  return gulp.src(paths.srcAssets)
    .pipe(gulp.dest(paths.wwwroot))
})

gulp.task('min:vendorjs', ['clean:vendor'], function () {
  return gulp.src(bowerfiles('**/*.js'), { base: '.' })
    .pipe(iif(!production, sourcemaps.init()))
    .pipe(concat(paths.concatVendorJsDest))
    .pipe(iif(!production, sourcemaps.write()))
    .pipe(iif(!production, sourcemaps.init()))
    // Note that compress: true and mangle: true gives you uglier code,
    // but makes debugging in the browser debugger more difficult.
    .pipe(uglify({compress: production, mangle: production}))
    .pipe(iif(!production, sourcemaps.write('.')))
    .pipe(gulp.dest('.'))
})

gulp.task('min:vendorcss', ['clean:vendor'], function () {
  return gulp.src(bowerfiles('**/*.css',
    {overrides: {
      'bootstrap': {main: bootstrapFiles},
      'font-awesome': {main: fontawesomeFiles}
    }}), { base: '.' })
    .pipe(iif(!production, sourcemaps.init()))
    .pipe(concat(paths.concatVendorCssDest))
    .pipe(cssmin())
    .pipe(iif(!production, sourcemaps.write('.')))
    .pipe(gulp.dest('.'))
})

gulp.task('vendorassets', ['clean:vendor'], function () {
  return gulp.src(bowerfiles(vendorExtensions,
    {overrides: {
      'bootstrap': {main: bootstrapFiles},
      'font-awesome': {main: fontawesomeFiles}
    }}), { base: '.' })
    .pipe(flatten({includeParents: -1}))
    .pipe(gulp.dest(paths.wwwroot))
})

gulp.task('build:app', function (done) {
  run(['min:js', 'min:css', 'min:html', 'min:image', 'assets'], done)
})

gulp.task('build:vendor', function (done) {
  run(['min:vendorjs', 'min:vendorcss', 'vendorassets'], done)
})

gulp.task('build', function (done) {
  run('clean:dest', ['build:app', 'build:vendor'], done)
})

gulp.task('production', function (done) {
  production = true
  run('build', done)
})

gulp.task('default', ['build'])

// Watch tasks

gulp.task('watch:js', function () {
  var watch = require('gulp-watch')
  var batch = require('gulp-batch')

  watch(paths.srcTs, batch(function (events, done) {
    gulp.start('min:js', done)
  }))
})

gulp.task('watch:css', function () {
  var watch = require('gulp-watch')
  var batch = require('gulp-batch')

  watch(paths.srcCss, batch(function (events, done) {
    gulp.start('min:css', done)
  }))
})

gulp.task('watch:html', function () {
  var watch = require('gulp-watch')
  var batch = require('gulp-batch')

  watch(paths.srcHtml, batch(function (events, done) {
    gulp.start('min:html', done)
  }))
})

gulp.task('watch:image', function () {
  var watch = require('gulp-watch')
  var batch = require('gulp-batch')

  watch(paths.srcImage, batch(function (events, done) {
    gulp.start('min:image', done)
  }))
})

gulp.task('watch:assets', function () {
  var watch = require('gulp-watch')
  var batch = require('gulp-batch')

  watch(paths.srcAssets, batch(function (events, done) {
    gulp.start('assets', done)
  }))
})

gulp.task('watch', ['watch:js', 'watch:css', 'watch:html', 'watch:image', 'watch:assets'])

// Browsersync tasks

gulp.task('watch:browsersync', function () {
  var browserSync = require('browser-sync').create()
  var proxy = require('proxy-middleware')
  var url = require('url')
  var watch = require('gulp-watch')
  var batch = require('gulp-batch')

  util.log(util.colors.cyan(' -- Only changes on application files will be synced using browser-sync --'))

  var proxyOptions = url.parse('http://localhost:5000/api')
  proxyOptions.route = '/api'

  browserSync.init({
    server: {
      baseDir: paths.wwwroot,
      middleware: [proxy(proxyOptions)]
    }
  })

  var sync = function (vinyl) {
    if (vinyl.event === 'add' || vinyl.event === 'change') {
      return gulp.src(vinyl.path)
        .pipe(browserSync.stream())
    }
  }

  watch(paths.concatJsDest.substr(2) + '*', sync)
  watch(paths.concatCssDest.substr(2) + '*', sync)
  watch([paths.htmlDest.substr(2), paths.imageDest.substr(2), paths.assetsDest.substr(2)],
    batch(function (events, done) {
      browserSync.reload()
      done()
    }
  ))

  gulp.start('watch')
})
