import React from 'react'
import PropTypes from 'prop-types'

const Title = ({ children, className, ...props }) => {
	// Merge the default and custom class names
	const classList = [`title text-4xl font-bold`, className].join(` `)

	return (
		<h1 className={classList} {...props}>
			<span className="underline-teal-200 underline-thick bg-no-repeat">
				{children}
			</span>
		</h1>
	)
}

Title.propTypes = {
	className: PropTypes.string,
}

export default Title
