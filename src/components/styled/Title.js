import React from 'react'
import PropTypes from 'prop-types'

const Title = ({ children, tagName = `h1`, className, ...props }) => {
	const tagSizes = {
		h1: `text-4xl`,
		h2: `text-2xl`,
	}
	const fontSize = tagSizes[tagName] || ``
	const TagName = tagName

	// Merge the default and custom class names
	const classList = [`title font-bold`, fontSize, className].join(` `)

	return (
		<TagName className={classList} {...props}>
			<span className="underline-teal-200 underline-thick bg-no-repeat">
				{children}
			</span>
		</TagName>
	)
}

Title.propTypes = {
	className: PropTypes.string,
	tagName: PropTypes.string,
}

export default Title
