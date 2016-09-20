'use strict'

const del = require('del')

module.exports = {
  fn: function (gulp, paths, mode, done) {
    return del(paths.wwwroot)
  }
}
