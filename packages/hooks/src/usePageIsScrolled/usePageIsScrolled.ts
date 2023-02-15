import React from 'react';

/**
 * A hook to detect if page has been scrolled related to a specific HTML element.
 * This hook has to be used only once at the same time!
 * @param ref The scrollable element reference
 */
const usePageIsScrolled = (ref: React.RefObject<HTMLElement>) => {
	const [isPageScrolled, setIsPageScrolled] = React.useState(false);
	const [isPageFullScrolled, setIsPageFullScrolled] = React.useState(false);

	React.useLayoutEffect(() => {
		let lastScrollTop = 0;
		let isLastFullScroll = false;
		const element = ref.current;
		const handleScroll = () => {
			if (element) {
				if (lastScrollTop === 0 && element.scrollTop > 0) {
					setIsPageScrolled(true);
				} else if (lastScrollTop !== 0 && element.scrollTop === 0) {
					setIsPageScrolled(false);
				}
				lastScrollTop = element.scrollTop;
				const isFullScroll = element.scrollTop === element.scrollHeight - element.clientHeight;
				if (isFullScroll && !isLastFullScroll) setIsPageFullScrolled(true);
				else if (!isFullScroll && isLastFullScroll) setIsPageFullScrolled(false);
				isLastFullScroll = isFullScroll;
			}
		};

		if (element) {
			element.addEventListener('scroll', handleScroll, {
				capture: false,
				passive: true
			});
			setIsPageScrolled(element.scrollTop !== 0);
		}
		return () => {
			if (element) element.removeEventListener('scroll', handleScroll);
		};
	}, [ref]);

	return { isScrolled: isPageScrolled, isFullScrolled: isPageFullScrolled };
};

export default usePageIsScrolled;
