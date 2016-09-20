'use strict'

const del = require('del')

module.exports = {
  fn: function (gulp, paths, production, done) {
    return del(paths.wwwroot)
  }
}
