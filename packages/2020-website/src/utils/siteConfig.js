module.exports = {
	siteUrl: `https://fedetibaldo.com`, // Site domain. Do not include a trailing slash!

	postsPerPage: 12, // Number of posts shown on paginated pages (changes this requires sometimes to delete the cache)

	siteTitleMeta: `fedetibaldo`, // This allows an alternative site title for meta data for pages.
	siteDescriptionMeta: `I'm Federico Tibaldo. Full-time web developer, eager learner, with a questionable taste for music.`, // This allows an alternative site description for meta data for pages.

	shareImageWidth: 1600, // Change to the width of your default share image
	shareImageHeight: 900, // Change to the height of your default share image

	shortTitle: `fedetibaldo`, // Used for App manifest e.g. Mobile Home Screen
	siteIcon: `favicon.png`, // Logo in /static dir used for SEO, RSS, and App manifest
	// backgroundColor: `#e9e9e9`, // Used for Offline Manifest
	// themeColor: `#15171A`, // Used for Offline Manifest

	locales: [`it`, `en`],
	mainLocale: `en`,

	socials: [
		{
			name: `Twitter`,
			color: `1DA1F2`,
			username: `@fedetibaldo`,
			url: `https://twitter.com/fedetibaldo`,
			logo: `/images/social/twitter.png`,
		},
		{
			name: `LinkedIn`,
			color: `2867B2`,
			username: `Federico Tibaldo`,
			url: `https://linkedin.com/in/fedetibaldo/`,
			logo: `/images/social/linkedin.png`,
		},
		{
			name: `GitHub`,
			color: `000000`,
			username: `fedetibaldo`,
			url: `https://github.com/fedetibaldo`,
			logo: `/images/social/github.png`,
		},
	],

	credits: `Designed with Figma; powered by Ghost, Gatsby, and Tailwind; hosted on Netlify`,
	owner: `Federico Tibaldo`,
	copyright: `Some rights reserved`,
}
