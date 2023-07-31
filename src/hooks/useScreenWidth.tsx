// utils/useScreenWidth.js
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

export const useScreenWidth = () => {
	const [width, setWidth] = useState<number | null>(null);
	const [debouncedWidth] = useDebounce(width, 100); // Debounce the value to reduce unnecessary updates

	useEffect(() => {
		const handleResize = () => {
			setWidth(window.innerWidth);
		};

		// Initial width on mount
		setWidth(window.innerWidth);

		// Add event listener to window resize
		window.addEventListener('resize', handleResize);

		// Clean up the event listener on unmount
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return debouncedWidth;
};
