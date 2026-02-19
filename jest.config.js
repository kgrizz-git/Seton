export default {
  testEnvironment: 'jsdom',
  transform: {},
  moduleNameMapper: {
    '^phaser$': '<rootDir>/node_modules/phaser/dist/phaser.js'
  },
  testMatch: [
    '**/__tests__/**/*.test.js',
    '**/?(*.)+(spec|test).js'
  ]
};
