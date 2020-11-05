module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
  moduleNameMapper: {
    '^@hopejs/(.*?)$': '<rootDir>/packages/$1/src',
    hope: '<rootDir>/packages/hope/src'
  },
  rootDir: __dirname,
  testMatch: ['<rootDir>/packages/**/__tests__/**/*test.[jt]s'],
};