const path = require('path')
var wallabyWebpack = require('wallaby-webpack')

const src = path.resolve(__dirname, 'src')
const nodeModules = path.resolve(__dirname, 'node_modules')

module.exports = function (wallaby) {
  return {
    files: [
      { pattern: 'node_modules/core-js/client/shim.js', instrument: false },
      { pattern: 'src/app/**/*.ts', load: false },
      { pattern: 'test/stubs.ts', load: false }
    ],
    tests: [
      {pattern: 'test/**/*.spec.ts', load: false}
    ],
    compilers: {
      '**/*.ts': wallaby.compilers.typeScript()
    },
    postprocessor: wallabyWebpack({
      module: {
        rules: [
          { test: /\.css$/i, loader: 'css-loader' }
        ]
      },
      resolve: {
        extensions: ['.js'],
        modules: [src, nodeModules]
      }
    }),
    setup: function () {
      window.__moduleBundler.loadTests()
    }
  }
}
