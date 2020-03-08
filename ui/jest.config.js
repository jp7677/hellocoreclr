module.exports = {
  moduleNameMapper: {
    '^.+\\.scss$': 'jest-transform-stub'
  },
  transform: {
    '.+\\.ts$': 'ts-jest',
    '.+\\.html$': 'vue-template-loader-jest'
  }
}
