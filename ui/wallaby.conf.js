const path = require('path')
var wallabyWebpack = require('wallaby-webpack')

const src = path.resolve(__dirname, 'src')
const test = path.resolve(__dirname, 'test')
const nodeModules = path.resolve(__dirname, 'node_modules')

module.exports = function (wallaby) {
  return {
    files: [
      { pattern: path.join(nodeModules, 'core-js/client/shim.js'), instrument: false },
      { pattern: path.join(src, 'app/**/*.ts'), load: false },
      { pattern: path.join(test, 'stubs.ts'), load: false }
    ],
    tests: [
      {pattern: path.join(test, '**/*.spec.ts'), load: false}
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
