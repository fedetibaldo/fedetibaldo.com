const path = require(`path`)
const { postsPerPage, locales } = require(`./src/utils/siteConfig`)
const { getLocalizedUrl } = require(`./src/utils/localization`)
const { paginate } = require(`gatsby-awesome-pagination`)

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
	const config = getConfig()
	config.node = { fs: `empty` }
	// This will completely replace the webpack config with the modified object.
	actions.replaceWebpackConfig(config)
}
