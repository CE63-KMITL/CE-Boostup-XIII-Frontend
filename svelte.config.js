import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	compilerOptions: {
		warningFilter: (warning) => {
			const ignore = ["a11y_click_events_have_key_events", "a11y_no_static_element_interactions"];
			return !ignore.includes(warning.code);
		},
	},

	kit: {
		adapter: adapter(),
	},

	vitePlugin: {
		hot: {
			preserveLocalState: true,
		},
	},
};

export default config;
