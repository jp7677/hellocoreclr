'use strict'

var gulp = require('gulp')
var run = require('run-sequence')
var iif = require('gulp-if')
var ts = require('gulp-typescript')
var jspm = require('gulp-jspm')
var sourcemaps = require('gulp-sourcemaps')
var htmlreplace = require('gulp-html-replace')
var filenames = require('gulp-filenames')
var htmlmin = require('gulp-htmlmin')
var image = require('gulp-image-optimization')
var flatten = require('gulp-flatten')
var hash = require('gulp-hash-filename')
var util = require('gulp-util')
var del = require('del')
var path = require('path')

var paths = {
  wwwroot: './wwwroot/',
  src: './src/',
  test: './test/',
  jspmPackages: './src/jspm_packages/**/*'
}

var production = false

gulp.task('clean:dest', function () {
  return del(paths.wwwroot)
})

gulp.task('clean:js', function () {
  return del([paths.src + '**/*.{js,js.map}', '!' + paths.src + 'jspm.conf.js',
    paths.test + '**/*.{js,js.map}', '!' + paths.jspmPackages])
})

// -- Linting --

gulp.task('lint:ts', function (done) {
  if (production) {
    util.log('Skipping \'' + util.colors.cyan('gulp-tslint') + '\'')
    done()
    return
  }

  var tslint = require('gulp-tslint')
  return gulp.src([paths.src + '**/*.ts', paths.test + '**/*.ts', '!' + paths.jspmPackages])
    .pipe(tslint({formatter: 'verbose'}))
    .pipe(tslint.report({emitError: false}))
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
  return gulp.src([paths.src + '**/*.css', '!' + paths.jspmPackages])
    .pipe(stylelint({
      failAfterError: false,
      reporters: [
        {formatter: consoleFormatter}
      ]
    }))
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
  return gulp.src([paths.src + '**/*.html', '!' + paths.jspmPackages])
    .pipe(htmlhint())
    .pipe(htmlhint.reporter(consoleReporter))
})

gulp.task('lint', ['lint:ts', 'lint:css', 'lint:html'])

// -- Compile/bundle

gulp.task('tscompile', ['clean:js'], function () {
  var tsProject = ts.createProject('tsconfig.json')
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

gulp.task('bundle:app', ['tscompile'], function () {
  return gulp.src(paths.src + './app.js', { base: '.' })
    .pipe(iif(!production, sourcemaps.init({loadMaps: true})))
    .pipe(jspm({selfExecutingBundle: true, minify: true, fileName: 'app-bundle'}))
    .pipe(iif(production, hash({'format': '{hash}{ext}'})))
    .pipe(filenames('appbundle'))
    .pipe(iif(!production, sourcemaps.write('.')))
    .pipe(flatten())
    .pipe(gulp.dest('wwwroot/'))
})

gulp.task('min:html', ['bundle:app'], function () {
  var appbundle = filenames.get('appbundle')[0].substr(filenames.get('appbundle')[0].indexOf('/') + 1)

  return gulp.src([paths.src + '**/*.html', '!' + paths.jspmPackages])
    .pipe(htmlreplace({
      'appbundle': appbundle
    }))
    .pipe(htmlmin({
      collapseWhitespace: production,
      removeComments: production,
      sortAttributes: production,
      sortClassName: production
    }))
    .pipe(gulp.dest(paths.wwwroot))
})

gulp.task('min:image', function () {
  return gulp.src([paths.src + '**/*.{png,jpg,gif,svg}', '!' + paths.jspmPackages])
    .pipe(image({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(paths.wwwroot))
})

gulp.task('assets', function () {
  return gulp.src([paths.src + '**/*.ico', '!' + paths.jspmPackages])
    .pipe(gulp.dest(paths.wwwroot))
})

gulp.task('vendorassets', function () {
  return gulp.src(paths.jspmPackages + '**/*.{eot,svg,ttf,woff,woff2}')
    .pipe(gulp.dest(paths.wwwroot + '/jspm_packages'))
})

gulp.task('build', function (done) {
  run('clean:dest', ['lint', 'bundle:app', 'min:html', 'min:image', 'assets', 'vendorassets'], done)
})

gulp.task('production', function (done) {
  production = true
  run('build', done)
})

gulp.task('default', ['build'])

// -- Watch

gulp.task('watch:ts', function () {
  var watch = require('gulp-watch')
  var batch = require('gulp-batch')

  watch([paths.src + '**/*.ts', '!' + paths.jspmPackages], batch(function (events, done) {
    gulp.start('lint:ts', done)
    gulp.start('tscompile', done)
    done()
  }))
})

gulp.task('watch:css', function () {
  var watch = require('gulp-watch')
  var batch = require('gulp-batch')

  watch([paths.src + '**/*.css', '!' + paths.jspmPackages], batch(function (events, done) {
    gulp.start('lint:css', done)
    done()
  }))
})

gulp.task('watch:html', function () {
  var watch = require('gulp-watch')
  var batch = require('gulp-batch')

  watch([paths.src + '**/*.html', '!' + paths.jspmPackages], batch(function (events, done) {
    gulp.start('lint:html', done)
    done()
  }))
})

gulp.task('watch', function () {
  var browserSync = require('browser-sync').create()
  var proxy = require('proxy-middleware')
  var url = require('url')
  var watch = require('gulp-watch')
  var batch = require('gulp-batch')

  var proxyOptions = url.parse('http://localhost:5000/api')
  proxyOptions.route = '/api'

  browserSync.init({
    server: {
      baseDir: paths.src,
      middleware: [proxy(proxyOptions)]
    }
  })

  var sync = function (vinyl) {
    if (vinyl.event === 'add' || vinyl.event === 'change') {
      return gulp.src(vinyl.path)
        .pipe(browserSync.stream())
    }
  }

  watch([paths.src + '**/*.js', '!' + paths.jspmPackages], sync)
  watch([paths.src + '**/*.css', '!' + paths.jspmPackages], sync)
  watch([paths.src + '**/*.{html,png,jpg,gif,svg,ico}', '!' + paths.jspmPackages],
    batch(function (events, done) {
      browserSync.reload()
      done()
    }
  ))

  gulp.start('watch:ts')
  gulp.start('watch:css')
  gulp.start('watch:html')
})
