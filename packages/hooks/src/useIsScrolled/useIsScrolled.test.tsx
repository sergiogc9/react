import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import useIsScrolled from '.';

const wrapperTestId = 'wrapperComponent';
const getScrollComponent = () => {
	const Component = () => {
		const ref = React.useRef(null);
		const { hasScroll, percentage, px } = useIsScrolled(ref);

		return (
			<div data-testid={wrapperTestId} ref={ref} style={{ height: 200, overflowX: 'hidden', width: 200 }}>
				<div style={{ height: 200, width: '100%' }}>
					<span>{hasScroll ? 'HAS SCROLL' : 'HAS NOT SCROLL'}</span>
					<span>{`Percentage: ${percentage}`}</span>
					<span>{`PX: ${px}`}</span>
				</div>
			</div>
		);
	};

	return render(<Component />);
};

const mockElementHeights = () => {
	Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
		configurable: true,
		value: 100
	});
	Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
		configurable: true,
		value: 300
	});
};

describe('useIsScrolled', () => {
	it('should detect no scroll by default', () => {
		getScrollComponent();

		expect(screen.getByText('HAS NOT SCROLL')).toBeInTheDocument();
	});

	it('should detect scroll by default', () => {
		mockElementHeights();
		getScrollComponent();

		expect(screen.getByText('HAS SCROLL')).toBeInTheDocument();
	});

	it('should detect middle scroll', () => {
		mockElementHeights();
		getScrollComponent();

		fireEvent.scroll(screen.getByTestId(wrapperTestId), {
			target: { scrollTop: 50 }
		});

		expect(screen.getByText('HAS SCROLL')).toBeInTheDocument();
		expect(screen.getByText('Percentage: 25')).toBeInTheDocument();
		expect(screen.getByText('PX: 50')).toBeInTheDocument();
	});

	it('should detect final scroll', () => {
		mockElementHeights();
		getScrollComponent();

		fireEvent.scroll(screen.getByTestId(wrapperTestId), {
			target: { scrollTop: 200 }
		});

		expect(screen.getByText('HAS SCROLL')).toBeInTheDocument();
		expect(screen.getByText('Percentage: 100')).toBeInTheDocument();
		expect(screen.getByText('PX: 200')).toBeInTheDocument();
	});
});
