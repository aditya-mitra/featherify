import { useEffect } from 'react';

/**
 * hook to run an side effect after a `time`
 * @param fn callback function to run
 * @param deps dependencies passed in the `useEffect` deps
 * @param time the number of milliseconds after which the callback will run
 */
export default function useDebouncedEffect(
	fn: CallableFunction,
	deps: Array<any>,
	time: number
): void {
	const dependencies = [...deps, fn, time];

	useEffect(() => {
		const timeout = setTimeout(fn, time);
		return () => {
			clearTimeout(timeout);
		};
	}, dependencies);
}
