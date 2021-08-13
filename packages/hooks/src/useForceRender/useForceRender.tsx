import React from 'react';

/**
 * Hook to force a render
 * @returns Returns a function that renders the component again.
 */
const useForceRender = () => {
	const [, setValue] = React.useState(false);

	return React.useCallback(() => setValue(v => !v), []);
};

export default useForceRender;
