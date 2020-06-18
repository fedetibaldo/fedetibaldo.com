import React from 'react'
import PropTypes from 'prop-types'
import { socials } from '../utils/siteConfig'

const SocialCard = ({ name, color, username, url, logo }) => {
	const backgroundColor = `#${color}`

	const overallSaturation = color
		.match(/.{1,2}/g) // split every two characters
		.map(n => parseInt(n, 16)) // transform to decimal
		.map(n => 255 - n) // compute distance from maximum saturation
		.reduce((acc, val) => acc + val, 0) // sum the parts together

	const foregroundColor = overallSaturation > 255
		? `white`
		: `inherit`

	return (
		<a
			className="block px-2 py-1 mr-2 mb-2 font-normal underline-none text-sm leading-none"
			style={{ backgroundColor, color: foregroundColor }}
			href={url}
			target="_blank"
			rel="nofollow noopener noreferrer"
			title={name}
			key={name}
		>
			<img className="inline h-4 mr-1" src={logo} ariaHidden="true" />
			<span className="align-middle">{username}</span>
		</a>
	)
}

SocialCard.propTypes = {
	name: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	logo: PropTypes.string.isRequired,
}

const Socials = () => (
	<div className="flex flex-wrap">
		{socials.map(SocialCard)}
	</div>
)

export default Socials
