import React from 'react';

/**
 * Custom hook to keep open, close and toggle logic for a dialog, modal, etc.
 */
const useToggleDialog = () => {
	const [isOpen, setDialogOpen] = React.useState(false);

	const toggleOpen = React.useCallback(() => setDialogOpen(open => !open), []);
	const closeDialog = React.useCallback(() => setDialogOpen(false), []);

	return { isOpen, toggleOpen, closeDialog };
};

export default useToggleDialog;
