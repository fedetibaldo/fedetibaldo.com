const path = require(`path`)

const config = require(`./src/utils/siteConfig`)

/**
 * Development-only plugins
 */
const devPlugins = [
	{
		resolve: `gatsby-plugin-create-client-paths`,
		options: { prefixes: [`/preview/*`] },
    },
    {
        resolve: `gatsby-plugin-netlify-cms`,
        options: {
            modulePath: path.join(__dirname, `src/cms/cms.js`),
        },
    },
]

/**
 * Production-only plugins
 */
const prodPlugins = [
	{
		// This plugin is usually active by default, but by making it specific
		// I can override its options. Namely, the ignore key.
		resolve: `gatsby-plugin-page-creator`,
		options: {
			path: path.join(__dirname, `src`, `pages`),
			ignore: [`preview.js`],
		},
	},
]

/**
* This is the place where you can tell Gatsby which plugins to use
* and set them up the way you want.
*
* Further info 👉🏼 https://www.gatsbyjs.org/docs/gatsby-config/
*
*/
module.exports = {
	siteMetadata: {
		siteUrl: config.siteUrl,
	},
	plugins: [
		/**
         * Environment-dependent plugins
         */
		...(process.env.NODE_ENV === `development` ? devPlugins : prodPlugins),
		/**
         *  Content Plugins
         */
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: path.join(__dirname, `src`, `markdown-embeds`),
				name: `markdown-embeds`,
			},
		},
        `gatsby-transformer-remark`,
        {
			resolve: `gatsby-source-filesystem`,
			options: {
				path: path.join(__dirname, `content`, `posts`),
				name: `posts`,
			},
		},
		// Setup for optimised images.
		`gatsby-plugin-sharp`,
		`gatsby-transformer-sharp`,
		/**
         *  Utility Plugins
         */
		`gatsby-plugin-catch-links`,
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-force-trailing-slashes`,
		`gatsby-plugin-offline`,
		`gatsby-plugin-postcss`,
	],
}
