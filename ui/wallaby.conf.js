const path = require('path')
var wallabyWebpack = require('wallaby-webpack')

const src = 'src'
const test = 'test'
const nodeModules = 'node_modules'

module.exports = function (wallaby) {
  return {
    reportConsoleErrorAsError: true,
    files: [
      { pattern: path.join(nodeModules, 'core-js/client/shim.js'), instrument: false },
      { pattern: path.join(src, 'app/**/*.ts'), load: false },
      { pattern: path.join(test, 'stubs.ts'), load: false }
    ],
    tests: [
      {pattern: path.join(test, '**/*.spec.ts'), load: false}
    ],
    postprocessor: wallabyWebpack({
      module: {
        rules: [
          { test: /\.css$/i, loader: 'css-loader' }
        ]
      },
      resolve: {
        extensions: ['.js'],
        modules: [path.join(wallaby.projectCacheDir, src)]
      }
    }),
    setup: function () {
      window.__moduleBundler.loadTests()
    }
  }
}
