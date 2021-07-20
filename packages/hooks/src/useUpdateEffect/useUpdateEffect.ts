import React from 'react';

/**
 * Hook same than useEffect without executing the effect in the first render
 * @param effect The callback function to execute
 * @param deps The useEffect dependencies
 */
const useUpdateEffect = (effect: React.EffectCallback, deps: React.DependencyList) => {
	const isMounted = React.useRef(false);

	// eslint-disable-next-line consistent-return
	React.useEffect(() => {
		if (isMounted.current) return effect();
		isMounted.current = true;
	}, deps); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useUpdateEffect;
