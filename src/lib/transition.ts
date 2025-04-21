import { cubicOut, quadInOut } from "svelte/easing";

/*
-------------------------------------------------------
Scale Transition
-------------------------------------------------------
*/
export function azScale(
	node: HTMLElement,
	params: { delay?: number; duration?: number; size?: number; easing?: any } = {}
) {
	const existingTransform = getComputedStyle(node).transform.replace("none", "");

	function cal(t, target = 0.95) {
		return 1 - (1 - target) * (1 - t);
	}

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
export function azFade(node: HTMLElement, { delay = 0, duration = 400, easing = cubicOut } = {}) {
	const o = +getComputedStyle(node).opacity;

	return {
		delay,
		duration,
		easing,
		css: (t) => `opacity: ${t * o}`,
	};
}
