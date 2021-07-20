import React from 'react';
import { render } from '@testing-library/react';

import useFileInput from '.';

const files = ['fake-file'];
const input: any = { onchange: () => {}, files };
input.click = () => input.onchange();
const createElement = document.createElement.bind(document);
document.createElement = (tagName: any) => {
	if (tagName === 'input') {
		return input;
	}
	return createElement(tagName);
};

const mockOnSelectFile = jest.fn();
const getComponent = ({ accept, open = false, multiple = false }: any = {}) => {
	const Component = () => {
		const openDialog = useFileInput(mockOnSelectFile, { accept, multiple });

		React.useEffect(() => {
			if (open) openDialog();
		}, [openDialog]);

		return <span>Awesome</span>;
	};
	return render(<Component />);
};

describe('useFileInput hook', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('should not open dialog', () => {
		getComponent();
		expect(mockOnSelectFile).not.toHaveBeenCalled();
	});

	it('should open dialog and return select files', () => {
		getComponent({ open: true });
		expect(mockOnSelectFile).toHaveBeenCalledWith(files);
	});

	it('should open dialog and return nothing if user cancels dialog', () => {
		input.files = undefined;
		getComponent({ open: true });
		expect(mockOnSelectFile).not.toHaveBeenCalled();
		input.files = files;
	});

	it('should append input properties', () => {
		getComponent({ accept: 'accepted', multiple: true, open: true });
		expect(input.accept).toBe('accepted');
		expect(input.multiple).toBe(true);
	});
});
