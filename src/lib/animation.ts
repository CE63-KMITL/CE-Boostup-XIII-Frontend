import { sleep } from "./normalFunction";

export async function runProblemListAnimation(elements) {
	for (const element of elements) {
		element.style.opacity = 0;
	}

	for (const element of elements) {
		element.style.animation = `slide-in 0.2s ease-out forwards`;
		await sleep(70);
	}
}
