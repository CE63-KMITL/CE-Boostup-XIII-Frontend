export async function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function say(text, emojicon) {
	return `${text}\n\n${emojicon}`;
}
