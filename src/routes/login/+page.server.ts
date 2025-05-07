import { redirect, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ cookies, fetch, url }) => {
	if (url.toString().includes("clear")) {
		cookies.delete("token", { path: "/" });
		redirect(307, "/login");
	}

	if (cookies.get("token") && !url.toString().includes("force")) {
		redirect(307, "/menu");
	}
};
