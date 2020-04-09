module.exports = {
  coverageDirectory: './coverage',
  testURL: 'http://localhost',
  collectCoverageFrom: [
    '**/src/**/*.js',
    '!**/__tests__/**',
    '!**/node_modules/**',
    '!**/serviceWorker.js',
    '!**/index.js',
  ],
  // coverageThreshold: {
  //   global: {
  //     statements: 10,
  //     branches: 10,
  //     functions: 10,
  //     lines: 10,
  //   },
  // },
}
