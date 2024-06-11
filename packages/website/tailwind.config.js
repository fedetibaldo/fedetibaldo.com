module.exports = {
	purge: [
		`./src/**/*.js`,
	],
	theme: {
		container: {
			center: true,
		},
		screens: {
			/* Original */
			// sm: `640px`,
			// md: `768px`,
			// lg: `1024px`,
			// xl: `1280px`,

			/* Custom */
			sm: `640px`,
			lg: `800px`,
		},
		extend: {
			fontFamily: {
				sans: [
					// custom font
					`Source Sans Pro`,
					// default sans stack
					`system-ui`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, `Helvetica Neue`, `Arial`, `Noto Sans`, `sans-serif`, `Apple Color Emoji`, `Segoe UI Emoji`, `Segoe UI Symbol`, `Noto Color Emoji`,
				],
			},
			lineHeight: {
				tight: `1.2`,
				relaxed: `1.6`,
			},
		},
	},
	variants: {},
	plugins: [],
}
