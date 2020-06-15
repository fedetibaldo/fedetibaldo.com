const path = require(`path`)

const config = require(`./src/utils/siteConfig`)

let ghostConfig

try {
    ghostConfig = require(`./.ghost`)
} catch (e) {
    ghostConfig = {
        production: {
            apiUrl: process.env.GHOST_API_URL,
            contentApiKey: process.env.GHOST_CONTENT_API_KEY,
        },
    }
} finally {
    const { apiUrl, contentApiKey } = process.env.NODE_ENV === `development` ? ghostConfig.development : ghostConfig.production

    if (!apiUrl || !contentApiKey || contentApiKey.match(/<key>/)) {
        throw new Error(`GHOST_API_URL and GHOST_CONTENT_API_KEY are required to build. Check the README.`) // eslint-disable-line
    }
}

/**
 * Development-only plugins
 */
const devPlugins = [
    {
        resolve: `gatsby-plugin-create-client-paths`,
        options: { prefixes: [`/preview/*`] },
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
            resolve: `gatsby-source-ghost`,
            options:
                process.env.NODE_ENV === `development`
                    ? ghostConfig.development
                    : ghostConfig.production,
        },
        // Setup for optimised images.
        // See https://www.gatsbyjs.org/packages/gatsby-image/
        {
            resolve: `gatsby-plugin-remote-images`,
            options: {
                nodeType: `GhostPost`,
                imagePath: `feature_image`,
            },
        },
        {
            resolve: `gatsby-plugin-remote-images`,
            options: {
                nodeType: `GhostSettings`,
                imagePath: `cover_image`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `src`, `images`),
                name: `images`,
            },
        },
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        // Ghost content
        {
            resolve: `gatsby-transformer-rehype`,
            options: {
                // Condition for selecting an existing GrapghQL node (optional)
                // If not set, the transformer operates on file nodes.
                filter: node => node.internal.type === `GhostPost` || node.internal.type === `GhostPage`,
                // Plugins configs (optional but most likely you need one)
                plugins: [
                    {
                        resolve: `@fedetibaldo/gatsby-rehype-ghost-links`,
                        options: {
                            cmsUrl: `http://localhost:3001/`,
                        },
                    },
                    {
                        resolve: `@fedetibaldo/gatsby-rehype-ghost-images`,
                        options: {},
                    },
                ],
            },
        },
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
