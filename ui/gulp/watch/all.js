'use strict'

module.exports = {
  fn: function (gulp, paths, production, done) {
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
  }
}
