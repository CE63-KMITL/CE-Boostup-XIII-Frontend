import { getUserData } from "$lib/auth";
import { Role } from "$lib/enum/role";
import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ cookies, fetch }) => {
	const data = await getUserData({ cookies, fetch, autoRedirect: false });
	console.log(data);
	if (data && data.role != Role.STAFF && data.role != Role.DEV) {
	}
	return data;
};
