/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
// eslint-disable-next-line  no-undef
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '\\.spec\\.ts',
};
