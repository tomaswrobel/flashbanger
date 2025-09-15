import { vitePreprocess, type SvelteConfig } from "@sveltejs/vite-plugin-svelte";
import type { PreprocessorGroup } from "svelte/compiler";
import { mdsvex } from "mdsvex";

const MDSVEX_EXTENSIONS = [".svx", ".md"];

const config: SvelteConfig = {
	preprocess: [
		vitePreprocess({
			script: false,
			style: false,
		}),
		mdsvex({
			extensions: [...MDSVEX_EXTENSIONS],
		}) as PreprocessorGroup,
	],
	extensions: [".svelte", ...MDSVEX_EXTENSIONS],
};

export default config;
