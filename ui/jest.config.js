module.exports = {
  moduleNameMapper: {
    '^.+\\.scss$': 'jest-transform-stub'
  },
  transform: {
    '.+\\.ts$': 'ts-jest',
    '.+\\.html$': 'vue-template-loader-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!**/*.d.ts'],
  coverageReporters: ['json', 'text-summary'],
  coverageDirectory: '../reports/',
  watchPathIgnorePatterns: ['node_modules']
}
