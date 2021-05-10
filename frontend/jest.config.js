module.exports = {
    verbose: true,
    testURL: 'http://localhost:3000',
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageThreshold: {
        global: {
            statements: 10,
            branches: 10,
            functions: 10,
            lines: 10,
        },
    },
    coverageDirectory: '<rootDir>/build/coverage',
    moduleDirectories: ['node_modules', 'app'],
    setupFilesAfterEnv: [],
    setupFiles: ['<rootDir>/jest.config.setupFiles.js'],
    testRegex: '.*\\.test\\.js$',
};
