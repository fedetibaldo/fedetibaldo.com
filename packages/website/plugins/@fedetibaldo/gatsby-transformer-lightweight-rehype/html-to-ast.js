/**
 * @author fedetibaldo
 */
const Rehype = require(`rehype`)
const stripPosition = require(`unist-util-remove-position`)

/**
 * Given some stringified html and some rehype options, parse the html and return the ast
 */
const htmlToAst = ({ /* cache, */ html, rehypeOptions = {} }) => {
	// Destructure `rehypeOptions` and assign default values
	const {
		fragment = true,
		space = `html`,
		emitParseErrors = false,
		verbose = false,
		...leftOvers
	} = rehypeOptions

	const rehype = new Rehype().data(`settings`, { fragment, space, emitParseErrors, verbose, ...leftOvers })

	return stripPosition(rehype.parse(html))
}

module.exports = htmlToAst