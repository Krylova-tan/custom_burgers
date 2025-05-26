import type { JestConfigWithTsJest } from 'ts-jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',

  // Добавляем поддержку путей из tsconfig
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  }),

  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        // дополнительные настройки ts-jest
        tsconfig: 'tsconfig.json',
        useESM: false
      }
    ]
  }
};

export default config;
