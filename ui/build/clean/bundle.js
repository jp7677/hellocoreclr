'use strict'

const {argv, paths} = require('../../settings')
const del = require('del')

exports.deps = ['bundle:js', 'bundle:systemjs']
exports.fn = (gulp, done) => {
  return del(paths.src + './app-bundle*.js')
}
