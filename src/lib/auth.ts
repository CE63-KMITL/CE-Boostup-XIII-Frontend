import { redirect } from "@sveltejs/kit";

const BACK_HOST = import.meta.env.VITE_BACK_HOST;
const tokenCookieName = "token";

export const getUserData = async ({ cookies, fetch, autoRedirect = true }) => {
	const token = cookies.get(tokenCookieName);

	let userData;

	if (token) {
		// console.log(token);
		try {
			const response = await fetch(`http://${BACK_HOST}/user/data`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				const data = await response.json();
				userData = data;
			} else if (response.status === 401 || response.status === 403) {
				cookies.delete(tokenCookieName, { path: "/" });
				userData.role = null;
			} else {
				console.error(`Backend API error: ${response.status}\n${await response.text()}`);
				userData.role = null;
			}
		} catch (err) {
			console.error("Error fetching/validating user role:", err);
			userData = null;
		}
	} else {
		// console.log("No auth token cookie found.");
		if (autoRedirect) redirect(307, "/login");
	}

	// console.log("User data", userData);

	return userData;
};
