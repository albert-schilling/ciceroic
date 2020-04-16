module.exports = {
  coverageDirectory: './coverage',
  testURL: 'http://localhost',
  collectCoverageFrom: [
    '**/src/**/*.js',
    '**/src/**/*.stories.js',
    '!**/__tests__/**',
    '!**/node_modules/**',
    '!**/serviceWorker.js',
    '!**/index.js',
  ],
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 50,
    },
  },
}
