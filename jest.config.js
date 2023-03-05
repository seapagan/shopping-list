require("dotenv").config();

module.exports = {
  moduleFileExtensions: ["tsx", "ts", "js", "jsx"],
  testMatch: ["**/tests/**/*.test.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  // moduleDirectories:[],
  watchPathIgnorePatterns: ["<rootdir>/dist/"],
  moduleNameMapper: {
    // eslint-disable-next-line
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/tests/__mocks__/fileMock.js",
    // "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(sa|sc|c)ss$": "identity-obj-proxy",
  },

  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.[tj]s(x)?"],
  coveragePathIgnorePatterns: ["src/modules/vendor"],
  coverageReporters: ["json", "html", "lcov", "text"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.js"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testEnvironment: "jest-environment-jsdom",
  notify: false,
};
