import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import useFetchImage from '.';

const mockCreateImage = jest.fn();
const fetchedImage = 'fake-fetched-image';
let event = 'load';
(global as any).Image = class extends Image {
	constructor() {
		super();
		mockCreateImage();
		setTimeout(() => {
			this.dispatchEvent(new Event(event));
		}, 20);
	}
};

const createElement = document.createElement.bind(document);
document.createElement = (tagName: any) => {
	if (tagName === 'canvas') {
		return {
			getContext: () => ({ drawImage: () => {} }),
			toDataURL: () => fetchedImage
		};
	}
	return createElement(tagName);
};

const getComponent = ({ url = 'fake-url' }: any) => {
	const Component = () => {
		const image = useFetchImage(url);

		return <span>{image || 'null'}</span>;
	};
	return render(<Component />);
};

describe('useFetchImage hook', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('should return null if url is not provided', () => {
		getComponent({ url: null });
		expect(screen.getByText('null')).toBeInTheDocument();
	});

	it('should return image once fetched', async () => {
		getComponent({});
		await waitFor(() => expect(screen.getByText(fetchedImage)).toBeInTheDocument());
	});

	it('should return image once fetched after some fails', async () => {
		event = 'error';
		getComponent({});
		await waitFor(() => expect(mockCreateImage).toHaveBeenCalledTimes(10));
	});
});
