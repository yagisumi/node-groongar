module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['<rootDir>/test/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'node', 'json'],
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['/node_modules/', '\\.d\\.ts$', '\\.(spec|test)\\.ts$'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.json',
    },
  },
  moduleNameMapper: {
    '^@/(.+)': '<rootDir>/src/$1',
  },
  testTimeout: 30000,
}
