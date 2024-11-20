import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapter from "amplify-adapter";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
	},
	preprocess: vitePreprocess(),
};
export default config;
