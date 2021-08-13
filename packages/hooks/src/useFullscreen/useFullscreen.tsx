import React from 'react';
import screenfull, { Screenfull } from 'screenfull';

import useForceRender from 'hooks/useForceRender';

const typedScreenfull = screenfull as Screenfull;

/**
 * A hook to use the browser Full Screen API
 * @returns The element with full screen and some functions to enable and / or disable the full screen feature.
 */
const useFullscreen = () => {
	const rerender = useForceRender();

	React.useEffect(() => {
		// eslint-disable-next-line no-console
		typedScreenfull.onerror(ev => console.error('Failed to enable fullscreen', ev));
	});

	React.useEffect(() => {
		typedScreenfull.onchange(rerender);
	}, [rerender]);

	const closeFullscreen = React.useCallback<Screenfull['exit']>(() => typedScreenfull.exit(), []);

	const openFullscreen = React.useCallback<Screenfull['request']>(
		(element, options) => typedScreenfull.request(element, options),
		[]
	);

	const toggleFullscreen = React.useCallback<Screenfull['toggle']>(
		(element, options) => typedScreenfull.toggle(element, options),
		[]
	);

	return {
		closeFullscreen,
		isFullscreen: typedScreenfull.isFullscreen,
		fullscreenElement: typedScreenfull.element,
		openFullscreen,
		toggleFullscreen
	};
};

export default useFullscreen;
