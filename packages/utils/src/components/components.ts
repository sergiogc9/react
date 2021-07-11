import React from 'react';

export const createNameSpacedComponent = <T extends React.ElementType, U extends Record<string, React.ElementType>>(
	mainComponent: T,
	composedComponents: U
) => {
	// eslint-disable-next-line @typescript-eslint/ban-types
	const composedComponent = { ...(mainComponent as object) };
	Object.keys(composedComponents).forEach(key => {
		(composedComponent as any)[key] = composedComponents[key];
	});
	return composedComponent as T & U;
};
