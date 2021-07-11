process.env.TZ = 'UTC';

module.exports = {
	roots: ['<rootDir>/packages/components/src', '<rootDir>/packages/hooks/src', '<rootDir>/packages/utils/src'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	},
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', './jest.setup.js'],
	testRegex: '.*.test.(ts|tsx)?$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	moduleNameMapper: {
		'^components/(.*)': '<rootDir>/packages/components/src/$1',
		'^hooks/(.*)': '<rootDir>/packages/hooks/src/$1',
		'^utils/(.*)': '<rootDir>/packages/utils/src/$1'
	},
	coverageReporters: ['json', 'lcov', 'text', 'clover', 'text-summary', 'cobertura'],
	collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*/index.ts'],
	coverageThreshold: {
		global: {
			statements: 0,
			branches: 0,
			functions: 0,
			lines: 0
		}
	}
};
