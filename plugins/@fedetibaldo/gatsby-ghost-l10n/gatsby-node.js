/**
 * @author fedetibaldo
 */

exports.setFieldsOnGraphQLNodeType = async ({ type, getNodesByType }, pluginOptions) => {
	// Plugin options destructuring + default assignments
	const {
		// These must be declared as a plugin option, as Ghost doesn't have any built-in multi-language feature yet
		locales = [],
		// Truth be told, there are actually two `GhostSettings` nodes. One is a mock, the other is real.
		// See https://github.com/gatsbyjs/gatsby/issues/10856#issuecomment-451701011
		defaultLocale = getNodesByType(`GhostSettings`)[0].lang,
	} = pluginOptions

	if (type.name === `GhostPost` || type.name === `GhostPage`) {
		return {
			locale: {
				type: `String`,
				resolve: source => locales.find(locale => source.tags.some(tag => tag.slug === locale)) || defaultLocale,
			},
		}
	}

	// by default return empty object
	return {}
}
