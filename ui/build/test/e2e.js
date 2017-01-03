'use strict'

exports.dep = ['serve:wwwroot']
exports.fn = (gulp, paths, argv, done) => {
  var protractor = require('gulp-protractor').protractor

  return gulp.src(paths.test + '**/(e2e)*.js')
    .pipe(protractor({
      configFile: 'protractor.conf.js'
    }))
    .on('error', () => {
      process.exit(1)
    })
}
