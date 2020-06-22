/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const htmlToAst = require(`./html-to-ast`)

/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.org/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */
// exports.onPreInit = () => console.log("Loaded gatsby-transformer-lightweight-rehype")

exports.setFieldsOnGraphQLNodeType = ({ type }, pluginOptions) => {
	// Destructure `pluginOptions` and assign default values
	const {
		filter = () => false,
		sourceFieldName = `html`,
		targetFieldName = `htmlAst`,
		...rehypeOptions
	} = pluginOptions

	if (filter(type)) {
		return {
			[targetFieldName]: {
				type: `JSON`,
				resolve: source => htmlToAst({
					html: source[sourceFieldName],
					rehypeOptions,
				}),
			},
		}
	}

	return {}
}
