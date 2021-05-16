module.exports = {
    verbose: true,
    preset: 'ts-jest', // make jest work with ts on nodejs
    testEnvironment: 'node',
    testURL: 'http://localhost:4000',
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
    clearMocks: true,
    coverageThreshold: {
        global: {
            statements: 10,
            branches: 10,
            functions: 10,
            lines: 10,
        },
    },
    coverageDirectory: '<rootDir>/build/coverage',
    moduleDirectories: ['node_modules', 'src'],
    setupFilesAfterEnv: [],
    setupFiles: ['<rootDir>/jest.config.setupFiles.js'],
    moduleNameMapper: {
        '~/(.*)': ['<rootDir>/src/$1'], // add alias to root with ~
    },
};
