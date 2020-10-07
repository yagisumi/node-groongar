module.exports = {
  rootDir: '../',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['<rootDir>/test/groongar/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'node', 'json'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['/node_modules/', '\\.d\\.ts$', '\\.(spec|test)\\.ts$'],
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.json',
    },
  },
  // globalSetup: './test/setup.js',
  // setupFiles: ['./test/fix-instanceof.js'],
  moduleNameMapper: {
    '^@/(.+)': '<rootDir>/src/$1',
  },
  testTimeout: 30000,
}
