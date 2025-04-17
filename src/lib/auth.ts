const backendApiUrl = "YOUR_BACKEND_API/validate-token";
const tokenCookieName = "authToken";

export const getUserData = async ({ cookies, fetch }) => {
	const token = cookies.get(tokenCookieName);

	let userData = {
		role: null,
	};

	if (token) {
		try {
			const response = await fetch(backendApiUrl, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				userData = (await response.json()) || userData;
			} else if (response.status === 401 || response.status === 403) {
				cookies.delete(tokenCookieName, { path: "/" });
				userData.role = null;
			} else {
				console.error(`Backend API error: ${response.status}`);
				userData.role = null;
			}
		} catch (err) {
			console.error("Error fetching/validating user role:", err);
			userData = null;
		}
	} else {
		console.log("No auth token cookie found.");
	}

	return userData;
};
