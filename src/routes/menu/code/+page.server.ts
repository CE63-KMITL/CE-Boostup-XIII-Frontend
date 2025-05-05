import { getUserData } from "$lib/auth";
import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ cookies, fetch }) => {
     return {
          ...(await getUserData({ cookies, fetch, autoRedirect: false }))
     };
};
