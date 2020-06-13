const path = require(`path`)
const fs = require(`fs-extra`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const { selectAll } = require(`unist-util-select`)
const visit = require(`unist-util-visit`)

function getPublicUrl({ file, pathPrefix = `` }) {
	const fileName = `${file.internal.contentDigest}/${file.base}`
	const publicPath = path.join(process.cwd(), `public`, `static`, fileName)

	if (!fs.existsSync(publicPath)) {
		fs.copy(file.absolutePath, publicPath, {
			dereference: true
		}, err => {
			if (err) {
				console.error(`error copying file from ${file.absolutePath} to ${publicPath}`, err)
			}
		})
	}

	return `${pathPrefix}/static/${fileName}`
}

exports.default = ({
	htmlAst,
	parentNodeId,
	getCache,
	createNodeId,
	reporter,
	pathPrefix
}, pluginOptions) => {

	// Custom wrapper
	visit(htmlAst, { tagName: `figcaption` }, (node) => {
		const wrapper = {
			type: `element`,
			tagName: `span`,
			properties: {},
			children: node.children
		}
		node.children = [wrapper]
	})

	const nodes = selectAll(`[tagName=img]`, htmlAst)

	return Promise.all(nodes.map(async (node) => {
		const src = node.properties && node.properties.src
		if (src) {
			const file = await createRemoteFileNode({
				url: src,
				parentNodeId,
				getCache,
				createNode: () => void 0,
				createNodeId,
				reporter
			})
			node.properties.src = getPublicUrl({ file, pathPrefix })
		}
	}))
}
