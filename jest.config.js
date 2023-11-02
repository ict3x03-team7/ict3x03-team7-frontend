"use strict";
const config = {
    // transform: {
    //     '^.+\\.ts?$': 'ts-jest',
    //     '^.+\\.tsx?$': 'ts-jest'
    // },
    testEnvironment: 'jsdom',
    testRegex: './src/.*\\.(test|spec)?\\.(js|js)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    "roots": [
        "<rootDir>/src"
    ],
    verbose: true,

    "moduleNameMapper": {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/__mocks__/fileMock.js",
        "\\.(css|less)$": "<rootDir>/src/__mocks__/styleMock.js"
      },

    "transformIgnorePatterns": [
        "node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"
      ]
      
      
};

export default config