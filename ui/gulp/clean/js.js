'use strict'

const del = require('del')

module.exports = {
  fn: function (gulp, paths, production, done) {
    return del([paths.src + '**/*.{js,js.map}', '!' + paths.src + 'jspm.conf.js',
      paths.test + '**/*.{js,js.map}', '!' + paths.jspmPackages])
  }
}
