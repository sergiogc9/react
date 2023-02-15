import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Storage } from '@sergiogc9/react-utils';

import useGetTableSort from './useGetTableSort';

const getComponent = (shouldRemove = false) => {
	const Component = () => {
		const { onSortChange, sortBy } = useGetTableSort('test', { id: 'id_test', desc: true });

		const onBtnClicked = React.useCallback(() => {
			if (shouldRemove) onSortChange(undefined, undefined);
			else onSortChange('updated_id', false);
		}, [onSortChange]);

		return (
			<div>
				<span>{sortBy.id}</span>
				<span>{sortBy.desc.toString()}</span>
				<button onClick={onBtnClicked} type="button">
					Click me
				</button>
			</div>
		);
	};

	return render(<Component />);
};

describe('useGetTableSort hook', () => {
	beforeEach(() => {
		Storage.clear();
	});

	it('should render default sort if not saved', () => {
		getComponent();

		expect(screen.getByText('id_test')).toBeInTheDocument();
		expect(screen.getByText('true')).toBeInTheDocument();
	});

	it('should render saved sort', () => {
		Storage.set('table_sort_test', { id: 'saved_id', desc: false });
		getComponent();

		expect(screen.getByText('saved_id')).toBeInTheDocument();
		expect(screen.getByText('false')).toBeInTheDocument();
	});

	it('should save updated sort', () => {
		getComponent();

		userEvent.click(screen.getByText('Click me'));

		expect(screen.getByText('updated_id')).toBeInTheDocument();
		expect(Storage.get('table_sort_test')).toEqual({ id: 'updated_id', desc: false });
	});

	it('should remove updated sort', () => {
		Storage.set('table_sort_test', { id: 'saved_id', desc: false });
		getComponent(true);

		expect(Storage.get('table_sort_test')).toEqual({ id: 'saved_id', desc: false });

		userEvent.click(screen.getByText('Click me'));

		expect(Storage.get('table_sort_test')).toBeNull();
	});
});
