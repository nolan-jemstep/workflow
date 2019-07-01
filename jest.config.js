module.exports = {
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}"
  ],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  transform: {
    "^.+\\.tsx?$": "babel-jest"
  }
};
