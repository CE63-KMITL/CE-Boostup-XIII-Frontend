import { getUserData } from "$lib/auth";
import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ cookies, fetch }) => {
	const data = await getUserData({ cookies, fetch, autoRedirect: false });

	console.log(data);

	return data;
};
