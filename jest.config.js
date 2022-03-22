module.exports = {
  preset: "ts-jest",
  globals: {
    __DEV__: true,
  },
  testEnvironment: "jsdom",
  watchPathIgnorePatterns: ["/node_modules/", "/dist/", "/.git/"],
  moduleNameMapper: {
    "^@/(.*?)$": "<rootDir>/src/$1"
  },
  rootDir: __dirname,
  testMatch: ["<rootDir>/__tests__/**/*test.[jt]s"],
};
