const visit = require(`unist-util-visit`)

exports.default = ({
	htmlAst,
	htmlNode,
	reporter,
}, pluginOptions) => {
	const {
		cmsUrl,
		basePath = `/`,
	} = pluginOptions

	const url = htmlNode && htmlNode.context && htmlNode.context.url
	const slug = htmlNode && htmlNode.context && htmlNode.context.slug

	if (!url && slug) {
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
