import React from 'react'

export const getHeadInjections = (headAst) => {
	const linkTags = headAst.children.filter(token => token.type === `element` && token.tagName === `link`)

	return linkTags.map((linkTag, index) => {
		const rel = linkTag.properties.rel.join(` `)
		delete linkTag.properties.rel
		return (<link rel={rel} {...linkTag.properties} key={index} />)
	})
}

export default getHeadInjections
