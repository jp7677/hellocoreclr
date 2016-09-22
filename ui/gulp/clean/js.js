'use strict'

const del = require('del')

exports.fn = function (gulp, paths, mode, done) {
  return del([paths.src + '**/*.{js,js.map}', '!' + paths.src + 'jspm.conf.js',
    paths.test + '**/*.{js,js.map}', '!' + paths.jspmPackages])
}
