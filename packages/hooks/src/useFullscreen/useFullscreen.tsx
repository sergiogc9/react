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
		if (typedScreenfull.isEnabled) typedScreenfull.onerror(ev => console.error('Failed to enable fullscreen', ev));
	});

	React.useEffect(() => {
		if (typedScreenfull.isEnabled) typedScreenfull.onchange(rerender);
	}, [rerender]);

	const closeFullscreen = React.useCallback<Screenfull['exit']>(async () => {
		if (typedScreenfull.isEnabled) await typedScreenfull.exit();
	}, []);

	const openFullscreen = React.useCallback<Screenfull['request']>(async (element, options) => {
		if (typedScreenfull.isEnabled) await typedScreenfull.request(element, options);
	}, []);

	const toggleFullscreen = React.useCallback<Screenfull['toggle']>(async (element, options) => {
		if (typedScreenfull.isEnabled) await typedScreenfull.toggle(element, options);
	}, []);

	return {
		closeFullscreen,
		isFullscreenEnabled: typedScreenfull.isEnabled,
		isFullscreen: typedScreenfull.isFullscreen,
		fullscreenElement: typedScreenfull.element,
		openFullscreen,
		toggleFullscreen
	};
};

export default useFullscreen;
