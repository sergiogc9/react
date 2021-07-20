import React from 'react';

/**
 * Adds a script tag into the head if not exists
 * @param id The script id. Used to prevent scripts to be added more than once.
 * @param src The script source
 */
const useAddMapsScript = (id: string, src: string) => {
	React.useEffect(() => {
		if (!document.querySelector(`script#${id}`)) {
			const script = document.createElement('script');
			script.setAttribute('async', '');
			script.setAttribute('id', id);
			script.src = src;
			document.querySelector('head')!.appendChild(script);
		}
	}, [id, src]);
};

export default useAddMapsScript;
