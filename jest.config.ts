/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {

  clearMocks: true,

  collectCoverage: false,
  // coverageDirectory: "coverage",
  // coveragePathIgnorePatterns: ["/node_modules/"],
  // coverageProvider: "v8",

  preset: 'ts-jest',
  roots: ["<rootDir>"],
  moduleFileExtensions: [
    "ts",
    "js"
  ],
  testMatch: ["<rootDir>/test/integrations/*"]
}
