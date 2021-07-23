import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import useIsHorizontalScrolled from '.';

const wrapperTestId = 'wrapperComponent';
const getScrollComponent = () => {
	const Component = () => {
		const ref = React.useRef(null);
		const { hasScroll, percentage, px } = useIsHorizontalScrolled(ref);

		return (
			<div data-testid={wrapperTestId} ref={ref} style={{ height: 200, overflowX: 'auto', width: 200 }}>
				<div style={{ height: 200, width: 400 }}>
					<span>{hasScroll ? 'HAS SCROLL' : 'HAS NOT SCROLL'}</span>
					<span>{`Percentage: ${percentage}`}</span>
					<span>{`PX: ${px}`}</span>
				</div>
			</div>
		);
	};

	return render(<Component />);
};

const mockElementWidths = () => {
	Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
		configurable: true,
		value: 100
	});
	Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
		configurable: true,
		value: 300
	});
};

describe('useIsHorizontalScrolled', () => {
	it('should detect no scroll by default', () => {
		getScrollComponent();

		expect(screen.getByText('HAS NOT SCROLL')).toBeInTheDocument();
	});

	it('should detect scroll by default', () => {
		mockElementWidths();
		getScrollComponent();

		expect(screen.getByText('HAS SCROLL')).toBeInTheDocument();
	});

	it('should detect middle scroll', () => {
		mockElementWidths();
		getScrollComponent();

		fireEvent.scroll(screen.getByTestId(wrapperTestId), {
			target: { scrollLeft: 50 }
		});

		expect(screen.getByText('HAS SCROLL')).toBeInTheDocument();
		expect(screen.getByText('Percentage: 25')).toBeInTheDocument();
		expect(screen.getByText('PX: 50')).toBeInTheDocument();
	});

	it('should detect final scroll', () => {
		mockElementWidths();
		getScrollComponent();

		fireEvent.scroll(screen.getByTestId(wrapperTestId), {
			target: { scrollLeft: 200 }
		});

		expect(screen.getByText('HAS SCROLL')).toBeInTheDocument();
		expect(screen.getByText('Percentage: 100')).toBeInTheDocument();
		expect(screen.getByText('PX: 200')).toBeInTheDocument();
	});
});
