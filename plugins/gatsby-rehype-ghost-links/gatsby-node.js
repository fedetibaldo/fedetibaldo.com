/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const visit = require(`unist-util-visit`)

/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.org/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */
// exports.onPreInit = () => console.log("Loaded gatsby-rehype-ghost-links")

exports.default = ({ htmlAst, htmlNode, getNode, getNodesByType, reporter }, pluginOptions) => {
	const {
		cmsUrl,
		basePath = `/`,
	} = pluginOptions

	const url = htmlNode && htmlNode.context && htmlNode.context.url
	const slug = htmlNode && htmlNode.context && htmlNode.context.slug

	if (!url && slug){
	    reporter.warn(`Expected url and slug not defined.`)
	    return htmlAst
	}

	visit(htmlAst, { tagName: `a` }, (node) => {
	    const href = node.properties && node.properties.href
	    if (href && href.startsWith(cmsUrl)) {
	        node.properties.href = href.replace(cmsUrl, basePath)
	    } else {
			node.properties.rel = `nofollow`
		}
	})

	return htmlAst
}
