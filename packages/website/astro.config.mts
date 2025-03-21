import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@astrojs/netlify";
import alpinejs from "@astrojs/alpinejs";

export default defineConfig({
	site: "https://fedetibaldo.com",
	trailingSlash: "never",

	vite: {
		plugins: [tailwindcss()],
	},

	adapter: netlify({
		imageCDN: false,
	}),

	integrations: [alpinejs()],
});
