import React from 'react';

export const createNameSpacedComponent = <
	T extends React.ElementType,
	U extends Record<string, React.ElementType | Record<string, React.ElementType>>
>(
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

export const lazyLoadComponent = <T extends React.ComponentType<any>>(
	factory: () => Promise<{
		default: T;
	}>
) => {
	const LazyComponent = React.lazy(factory);
	setTimeout(() => factory(), 1000);
	return LazyComponent;
};
