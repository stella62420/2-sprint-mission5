import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/test'],
  testMatch: ['**/?(*.)+(test|spec).ts'],
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
  moduleNameMapper: {
    '^socket\\.io$': '<rootDir>/test/__mocks__/socket.io.ts',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/main.ts',
    '!src/**/index.ts',
    '!src/**/types.ts',
  ],
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.json', isolatedModules: true }],
  },
  clearMocks: true,
  testTimeout: 30000,
  maxWorkers: 1,
  verbose: true,
};

export default config;
