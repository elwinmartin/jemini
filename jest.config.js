module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  setupTestFrameworkScriptFile: '<rootDir>/tests/setup.js',
  testRegex: './packages/[^/]+/tests/.+\\.spec\\.js$',
  collectCoverageFrom: ['packages/*/src/**/*.js'],
  testPathIgnorePatterns: ['/node_modules/', '/tests/fixtures/', '/tests/helpers/'],
  transformIgnorePatterns: ['/node_modules/(?!(@jemini/|jemini))', '<rootDir>/packages/[^/]+/lib/'],
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/packages/[^/]+/lib/'],
};
