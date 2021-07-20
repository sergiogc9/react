class ResizeObserverFake {
	constructor(callback) {
		callback();
	}

	// eslint-disable-next-line class-methods-use-this
	observe() {}

	// eslint-disable-next-line class-methods-use-this
	disconnect() {}
}

global.ResizeObserver = ResizeObserverFake;

// Comment next line to see errors in tests
// eslint-disable-next-line no-console
console.error = jest.fn();
