module.exports = function (wallaby) {
  return {
    reportConsoleErrorAsError: true,
    files: [
      { pattern: 'src/app/**/*.ts', load: false },
      { pattern: 'test/stubs.ts', load: false }
    ],
    tests: [
      { pattern: 'test/**/*.spec.ts', load: false }
    ],
    env: {
      kind: 'chrome'
    },
    postprocessor: wallaby.postprocessors.webpack({
      module: {
        rules: [
          { test: /\.ts$/, use: [{ loader: 'ts-loader', options: { transpileOnly: true } }] },
          { test: /\.html$/i, loader: 'vue-template-loader' },
          { test: /\.scss$/i, use: ['css-loader', 'sass-loader'] }
        ]
      },
      resolve: {
        extensions: ['.ts', '.js'],
        modules: ['src', 'node_modules']
      }
    }),
    setup: function () {
      window.__moduleBundler.loadTests()
    }
  }
}
