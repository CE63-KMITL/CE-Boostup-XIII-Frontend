const API_HOST = import.meta.env.VITE_API_HOST;

export async function call(route: string, method: string = "GET", data: any = null) {
	try {
		const response = await fetch(`${API_HOST}${route}`, {
			method,
			headers: {
				"Content-Type": "application/json",
			},
			body: data ? JSON.stringify(data) : null,
		});

		const contentType = response.headers.get("content-type");
		if (contentType && contentType.indexOf("application/json") !== -1) {
			return await response.json();
		} else {
			return await response.text();
		}
	} catch (error) {
		alert(`${route}\n\n${error}`);
		return null;
	}
}
