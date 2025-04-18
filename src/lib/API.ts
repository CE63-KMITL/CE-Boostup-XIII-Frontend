const API_HOST = import.meta.env.VITE_API_HOST;

export function call(route: string, method: string, data: any) {
	return fetch(`${API_HOST}/${route}`, {
		method,
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
}
