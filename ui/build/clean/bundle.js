'use strict'

const del = require('del')

exports.dep = ['bundle:js', 'bundle:systemjs']
exports.fn = function (gulp, paths, argv, done) {
  return del(paths.src + './app-bundle*.js')
}
