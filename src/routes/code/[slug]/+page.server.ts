import { type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ cookies, fetch, url, params }) => {
	let slug = params.slug;
	console.log(params);
	return {
		title: "Hello world!",
		content: "Welcome to our blog. Lorem ipsum dolor sit amet...",
	};
};
