import { getUserData } from "$lib/auth";
import { Role } from "$lib/enum/role";
import { redirect, type ServerLoad } from "@sveltejs/kit";

const strictPage = ["create_problem"];

export const load: ServerLoad = async ({ cookies, fetch, url }) => {
	const data = await getUserData({ cookies, fetch, autoRedirect: false });
	if (
		strictPage.includes(url.searchParams.get("page")) &&
		(!data || (data.role != Role.STAFF && data.role != Role.DEV))
	) {
		redirect(307, "/menu");
	}
	return data;
};
