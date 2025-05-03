import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import monacoEditorPlugin from "vite-plugin-monaco-editor";

export default defineConfig(({ mode }) => {
	return {
		plugins: [
			sveltekit(),
			(monacoEditorPlugin as any).default({
				languageWorkers: ["json"],
			}),
		],
		server: {
			port: 3001,
		},
	};
});
