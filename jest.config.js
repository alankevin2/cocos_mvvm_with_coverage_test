const esmModules = ['framework', 'test_framework_using_pnpm_for_cocos', 'lodash-es'];

module.exports = {
  preset: 'ts-jest', // 使用ts-jest的ESM预设
  testEnvironment: 'node',
  collectCoverage: true,
  roots: ['<rootDir>/assets'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.test.json', useESM: true }],
    '^.+\\.js$': 'babel-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^cc$': '<rootDir>/__mocks__/ccMock.js',  // 將 'cc' 導向到模擬文件
  },
  transformIgnorePatterns: [
    `/__mocks__/`, // 萬一上面用 ^._\\.js$ 就會把ccMock.js又跑一次babel，不是我們要的，所以mocks要ignore
    `<rootDir>/node_modules/(?!(?:.pnpm/)?(${esmModules.join('|')})@)`,] // 因為是pnpm，所以設置跟npm不一樣
};

