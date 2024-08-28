import type { Config } from 'jest';
import { defaults } from 'jest-config';

const config: Config = {
  verbose: true,
  preset: 'solid-jest/preset/browser',
  setupFilesAfterEnv: ['./src/setupTests.ts'],
  // coverage
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['assets', '.css.d.ts'],

  // Handle css, images, etc
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/src/__mocks__/svgMock.tsx',
    '\\.(scss|sass|css|less|styl)$': 'identity-obj-proxy',
    '^@ui/(.*)$': '<rootDir>/src/modules/ui/$1',
    '^@plugins/(.*)$': '<rootDir>/src/modules/plugins/$1',

    '^@common/(.*)$': '<rootDir>/src/modules/common/$1',
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
  // ignore babel
  modulePathIgnorePatterns: ['<rootDir>/cypress'],
};



export default config;