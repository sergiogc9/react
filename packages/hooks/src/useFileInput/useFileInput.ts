import React from 'react';

type Options = {
	accept?: string;
	multiple?: boolean;
};

/**
 * Hook to prompt for a file
 * @param callback The callback handler method that will receive the selected file(s).
 * @param options The file input options
 * @returns A function to be called when the user should select a file.
 */
const useFileInput = (callback: (files: FileList) => void, options: Options = {}) => {
	const input = React.useRef<HTMLInputElement>();

	React.useEffect(() => {
		input.current = document.createElement('input');
		input.current.type = 'file';
		input.current.hidden = true;

		input.current.onchange = () => {
			if (input.current && input.current.files) {
				callback(input.current.files);
			}
		};
	}, [callback]);

	React.useEffect(() => {
		if (input.current) {
			if (options.accept) input.current.accept = options.accept;
			if (options.multiple) input.current.multiple = options.multiple;
		}
	}, [options]);

	return React.useCallback(() => {
		if (input.current) {
			input.current.value = '';
			input.current.click();
		}
	}, []);
};

export default useFileInput;
