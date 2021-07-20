import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import usePrevious from '.';

const getComponent = () => {
	const Component = () => {
		const [counter, setCounter] = React.useState(1);
		const previousCounter = usePrevious(counter);

		return (
			<>
				<span>Previous: {previousCounter}</span>
				<span>Current: {counter}</span>
				<button onClick={() => setCounter(c => c + 1)} type="button">
					Click me
				</button>
			</>
		);
	};
	return render(<Component />);
};

describe('usePrevious hook', () => {
	it('should return previous value', () => {
		getComponent();

		userEvent.click(screen.getByText('Click me'));

		expect(screen.getByText('Previous: 1')).toBeInTheDocument();
	});
});
