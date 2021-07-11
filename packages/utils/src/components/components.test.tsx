import React from 'react';
import { render, screen } from '@testing-library/react';

import * as components from '.';

const Text = () => <span>Text</span>;
const Button = () => <button type="button">Button</button>;
const All = React.memo(() => (
	<>
		<Text />
		<Button />
	</>
));

const Wrapped = components.createNameSpacedComponent(All, { Button, Text });

describe('Components lib', () => {
	it('should wrapper namespaced component render all correctly', () => {
		render(<Wrapped />);
		expect(screen.getByText('Text')).toBeInTheDocument();
		expect(screen.getByText('Button')).toBeInTheDocument();
	});

	it('should wrapper namespaced component render only button correctly', () => {
		render(<Wrapped.Button />);
		expect(screen.getByText('Button')).toBeInTheDocument();
		expect(screen.queryByText('Text')).toBeNull();
	});

	it('should wrapper namespaced component render only text correctly', () => {
		render(<Wrapped.Text />);
		expect(screen.queryByText('Button')).toBeNull();
		expect(screen.getByText('Text')).toBeInTheDocument();
	});
});
