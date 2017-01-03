'use strict'

const del = require('del')

exports.fn = (gulp, paths, argv, done) => {
  return del(paths.wwwroot)
}
