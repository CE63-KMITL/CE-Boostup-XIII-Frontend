import { redirect, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ cookies, fetch, url }) => {
	redirect(307, "/login");
};
