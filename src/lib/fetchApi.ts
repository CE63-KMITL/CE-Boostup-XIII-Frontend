import { getCookie } from "./cookie";

const API_HOST = import.meta.env.VITE_API_HOST;

export async function call(
	route: string,
	options: { method?: string; data?: any; withToken?: boolean } = { method: "GET", data: null, withToken: false }
) {
	try {
		const response = await fetch(`${API_HOST}${route}`, {
			method: options.method,
			headers: {
				"Content-Type": "application/json",
				Authorization: options.withToken ? `Bearer ${getCookie("token")}` : null,
			},
			body: options.data ? JSON.stringify(options.data) : null,
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
