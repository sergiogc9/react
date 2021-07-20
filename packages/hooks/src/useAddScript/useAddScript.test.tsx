import React from 'react';
import { render } from '@testing-library/react';

import useAddScript from '.';

const getComponent = () => {
	const Component = () => {
		useAddScript('test-id', 'test-src');

		return <head />;
	};
	return <Component />;
};

describe('useAddScript hook', () => {
	beforeEach(() => {
		document.querySelector('script')?.remove();
	});

	it('should add script', async () => {
		render(getComponent());

		expect(document.querySelector('script#test-id')).toBeInTheDocument();
	});

	it('should only add one script', async () => {
		render(
			<>
				{getComponent()}
				{getComponent()}
			</>
		);

		expect(document.querySelectorAll('script#test-id').length).toBe(1);
	});
});
