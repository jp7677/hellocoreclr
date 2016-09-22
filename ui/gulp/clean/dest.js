'use strict'

const del = require('del')

exports.fn = function (gulp, paths, mode, done) {
  return del(paths.wwwroot)
}
