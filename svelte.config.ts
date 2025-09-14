import { vitePreprocess, type SvelteConfig } from "@sveltejs/vite-plugin-svelte";

const config: SvelteConfig = {
	preprocess: vitePreprocess({
		script: false,
		style: false,
	}),
};

export default config;
