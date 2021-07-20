import React from 'react';

/**
 * Keeps the last render value
 * @param value The current value
 * @returns The previous render value
 */
const usePrevious = <T>(value: T): T | undefined => {
	const ref = React.useRef<T>();
	React.useEffect(() => {
		ref.current = value;
	});
	return ref.current;
};

export default usePrevious;
