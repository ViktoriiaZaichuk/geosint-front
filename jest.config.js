module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(j|t)sx?$': 'babel-jest',
      '^.+\\.svg$': '<rootDir>/__mocks__/svgTransform.js',
    },
}

