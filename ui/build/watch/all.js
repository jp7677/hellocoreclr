'use strict'

exports.fn = function (gulp, paths, mode, done) {
  var browserSync = require('browser-sync').create('server')
  var proxy = require('proxy-middleware')
  var url = require('url')

  var proxyOptions = url.parse('http://localhost:5000/api')
  proxyOptions.route = '/api'

  browserSync.init({
    server: {
      baseDir: paths.src,
      middleware: [proxy(proxyOptions)]
    }
  })

  gulp.watch([paths.src + '**/*.ts', '!' + paths.jspmPackages], ['lint:ts', 'watch:js'])
  gulp.watch([paths.src + '**/*.css', '!' + paths.jspmPackages], ['lint:css', 'watch:css'])
  gulp.watch([paths.src + '**/*.html', '!' + paths.jspmPackages], ['lint:html', 'watch:reload'])
  gulp.watch([paths.src + '**/*.{png,jpg,gif,svg,ico}', '!' + paths.jspmPackages], ['watch:reload'])
}
