import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@astrojs/netlify";
import preact from '@astrojs/preact';

export default defineConfig({
	site: "https://fedetibaldo.com",
	trailingSlash: "always", // Matches netlify's configuration anyway

	vite: {
		plugins: [tailwindcss()],
	},

	adapter: netlify({
		imageCDN: false,
	}),

	integrations: [preact()],
});
