export default {
  testEnvironment: 'jsdom',
  transform: {},
  moduleNameMapper: {
    '^phaser$': '<rootDir>/__mocks__/phaser.js'
  },
  testMatch: [
    '**/__tests__/**/*.test.js',
    '**/?(*.)+(spec|test).js'
  ],
  injectGlobals: true
};
