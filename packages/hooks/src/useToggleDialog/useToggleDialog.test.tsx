import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import useToggleDialog from '.';

describe('useToggleDialog hook', () => {
	const getComponent = () => {
		const Component = () => {
			const { isOpen, toggleOpen, closeDialog } = useToggleDialog();

			return (
				<>
					<div>{isOpen ? 'Opened' : 'Closed'}</div>
					<button onClick={toggleOpen} type="button">
						Toggle
					</button>
					<button onClick={closeDialog} type="button">
						Close dialog
					</button>
				</>
			);
		};
		return render(<Component />);
	};

	it('should hide dialog by default', () => {
		const { getByText } = getComponent();
		expect(getByText('Closed')).toBeInTheDocument();
	});

	it('should show dialog after toggle', () => {
		const { getByText } = getComponent();
		fireEvent.click(getByText('Toggle'));
		expect(getByText('Opened')).toBeInTheDocument();
	});

	it('should show dialog close dialog', () => {
		const { getByText } = getComponent();
		fireEvent.click(getByText('Toggle'));
		expect(getByText('Opened')).toBeInTheDocument();
		fireEvent.click(getByText('Close dialog'));
		expect(getByText('Closed')).toBeInTheDocument();
	});
});
