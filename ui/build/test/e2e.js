'use strict'

exports.dep = ['serve:wwwroot']
exports.fn = function (gulp, paths, mode, done) {
  var protractor = require('gulp-protractor').protractor

  return gulp.src('./src/tests/*.js')
    .pipe(protractor({
      configFile: 'protractor.conf.js'
    }))
    .on('error', () => {
      process.exit(1)
    })
}
