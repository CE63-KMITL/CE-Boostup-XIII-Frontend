import { sveltekit } from "@sveltejs/kit/vite";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
	return {
		plugins: [sveltekit()],
		build: {
			rollupOptions: {
				external: [
					"rate-limiter-flexible",
					/node_modules\/rate-limiter-flexible/,
					fileURLToPath(new URL("node_modules/rate-limiter-flexible", import.meta.url)),
				],
			},
		},
		server: {
			port: 3001,
		},
	};
});
