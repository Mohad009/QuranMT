
module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^axios$': require.resolve('axios')
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!axios)/'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.js'
  ],
  moduleDirectories: ['node_modules', 'src'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  extensionsToTreatAsEsm: ['.jsx'],
};

