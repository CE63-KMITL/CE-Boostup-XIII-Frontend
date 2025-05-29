import { redirect } from "@sveltejs/kit";

const BACK_HOST = import.meta.env.VITE_BACK_HOST;
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS;
const tokenCookieName = "token";

//-------------------------------------------------------
// Module-level Admin Token Cache
//-------------------------------------------------------
let G_ADMIN_TOKEN: string | null = null;
let G_ADMIN_TOKEN_OBTAINED_DATE: string | null = null;

//-------------------------------------------------------
// Configuration
//-------------------------------------------------------
const ADMIN_LOGIN_ENDPOINT = `http://${BACK_HOST}/auth/login`;
const USER_DATA_ENDPOINT = `http://${BACK_HOST}/user/data`;

//-------------------------------------------------------
// Helper Functions
//-------------------------------------------------------
async function getAdminAuthToken(fetchInstance: typeof fetch, email?: string, password?: string) {
	if (!email || !password) {
		console.error("Admin email or password is not configured.");
		return null;
	}
	try {
		const response = await fetchInstance(ADMIN_LOGIN_ENDPOINT, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});
		if (response.ok) {
			const data = await response.json();
			return data.token;
		} else {
			console.error(`Admin authentication failed: ${response.status}`, await response.text());
			return null;
		}
	} catch (err) {
		console.error("Error during admin authentication:", err);
		return null;
	}
}

//-------------------------------------------------------
// Admin Token Acquisition with Retry
//-------------------------------------------------------
async function ensureAdminToken(fetchInstance: typeof fetch): Promise<string> {
	const todayDateString = new Date().toISOString().split("T")[0];

	if (G_ADMIN_TOKEN && G_ADMIN_TOKEN_OBTAINED_DATE === todayDateString) {
		return G_ADMIN_TOKEN;
	}

	console.log("Admin token is not cached or has expired. Attempting to fetch a new one.");

	while (true) {
		const token = await getAdminAuthToken(fetchInstance, ADMIN_EMAIL, ADMIN_PASS);
		if (token) {
			console.log("Admin token obtained successfully.");
			G_ADMIN_TOKEN = token;
			G_ADMIN_TOKEN_OBTAINED_DATE = todayDateString;
			return token;
		}
		console.error("Failed to obtain admin token. Retrying in 5 seconds...");
		await new Promise((resolve) => setTimeout(resolve, 5000));
	}
}

//-------------------------------------------------------
// Main Function
//-------------------------------------------------------
export const getUserData = async ({ cookies, fetch, autoRedirect = true }) => {
	let userDataToReturn = null;
	const userTokenFromCookie = cookies.get(tokenCookieName);
	if (!userTokenFromCookie) {
		if (autoRedirect) {
			redirect(307, "/login");
		}
		return userDataToReturn;
	}

	const effectiveAdminToken = await ensureAdminToken(fetch);

	try {
		const response = await fetch(`${USER_DATA_ENDPOINT}?user_token=${userTokenFromCookie}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${effectiveAdminToken}`,
			},
		});

		if (response.ok) {
			userDataToReturn = await response.json();
		} else if (response.status === 401 || response.status === 403) {
			console.warn(
				`Authorization error (${response.status}) when fetching user data with admin token. Clearing user cookie.`
			);
			cookies.delete(tokenCookieName, { path: "/" });
		} else {
			console.error(
				`Backend API error while fetching user data with admin token: ${
					response.status
				}\n${await response.text()}`
			);
		}
	} catch (err) {
		console.error("Error fetching/validating user data with admin token:", err);
	}

	return userDataToReturn;
};
