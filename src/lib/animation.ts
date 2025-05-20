export async function runListAnimation(elements) {
	for (const element of elements) {
		element.style.opacity = 0;
	}

	for (let i = 0; i < elements.length; i++) {
		const element = elements[i];
		element.style.animation = `slide-in 0.2s ${0.07 * (i + 1)}s ease-out forwards`;
		// await sleep(70);
	}
}
