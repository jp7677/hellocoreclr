const path = require('path')
var wallabyWebpack = require('wallaby-webpack')

const src = 'src'
const test = 'test'

module.exports = function (wallaby) {
  return {
    reportConsoleErrorAsError: true,
    files: [
      { pattern: path.join(src, 'app/**/*.ts'), load: false },
      { pattern: path.join(src, 'app/**/*.html'), load: false },
      { pattern: path.join(src, 'styles/**/*.scss'), load: false },
      { pattern: path.join(test, 'stubs.ts'), load: false }
    ],
    tests: [
      { pattern: path.join(test, '**/*.spec.ts'), load: false }
    ],
    env: {
      kind: 'chrome'
    },
    postprocessor: wallabyWebpack({
      module: {
        rules: [
          { test: /\.html$/i, loader: 'vue-template-loader' },
          { test: /\.scss$/i, use: [ 'css-loader', 'sass-loader' ] }
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
