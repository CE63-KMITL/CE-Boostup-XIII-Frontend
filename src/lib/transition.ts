import { cubicOut, quadInOut } from "svelte/easing";

/*
-------------------------------------------------------
Scale Transition
-------------------------------------------------------
*/

function cal(t, target = 0.95) {
	return 1 - (1 - target) * (1 - t);
}

export function azScale(
	node: HTMLElement,
	params: { delay?: number; duration?: number; size?: number; easing?: any } = {}
) {
	const existingTransform = getComputedStyle(node).transform.replace("none", "");

	return {
		delay: params.delay || 0,
		duration: params.duration || 250,
		easing: params.easing || quadInOut,
		css: (t, u) => `
          transform: ${existingTransform} scale(${cal(t, params.size)});
          opacity: ${cal(t, 0)};
          `,
	};
}

/*
-------------------------------------------------------
Fade Transition
-------------------------------------------------------
*/
export function azFade(
	node: Element,
	{ from, to }: { from: DOMRect; to: DOMRect }, // Accept from/to as the first argument
	{ delay = 0, duration = 400, easing = cubicOut } = {} // Accept optional parameters as the second argument
) {
	return {
		delay,
		duration,
		easing,
		css: (t) => `opacity: ${t}`, // Simple fade from 0 to 1
	};
}
