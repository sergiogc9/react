import React from 'react';
import { Storage } from '@sergiogc9/react-utils';

import { TableSort } from './types';

const TABLE_SORT_STORAGE_PREFIX = 'table_sort_';

const __getSortByFromStorage = (tableKey: string): TableSort => {
	return Storage.get(TABLE_SORT_STORAGE_PREFIX + tableKey);
};

/**
 * A hook that saves the sort criteria used in a table in local storage
 * @param tableKey The unique identifier for the table. Used for saving the value into local storage.
 * @param defaultSort The criteria used in case no previous one is found in local storage.
 */
const useGetTableSort = (tableKey: string, defaultSort: TableSort) => {
	const [currentSort, setCurrentSort] = React.useState(__getSortByFromStorage(tableKey) ?? defaultSort);

	const onSortChange = React.useCallback(
		(id?: string, desc?: boolean) => {
			if (!id || desc === undefined) return Storage.remove(TABLE_SORT_STORAGE_PREFIX + tableKey);

			const newSort: TableSort = { id, desc };
			Storage.set(TABLE_SORT_STORAGE_PREFIX + tableKey, newSort);
			setCurrentSort(newSort);
		},
		[tableKey]
	);

	return { onSortChange, sortBy: currentSort };
};

export default useGetTableSort;
