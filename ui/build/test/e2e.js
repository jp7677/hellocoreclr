'use strict'

exports.dep = ['serve:wwwroot']
exports.fn = (gulp, paths, argv, done) => {
  const protractor = require('gulp-protractor').protractor

  return gulp.src(paths.testE2e + '**/*.spec.js')
    .pipe(protractor({
      configFile: 'protractor.conf.js'
    }))
    .on('error', () => {
      process.exit(1)
    })
}
