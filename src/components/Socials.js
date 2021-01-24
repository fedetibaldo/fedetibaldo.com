import React from 'react'
import PropTypes from 'prop-types'
import CustomPropTypes from '../utils/customPropTypes'
import { graphql, useStaticQuery } from 'gatsby'

import { Image } from './content'

const SocialCard = ({ icon, label, color, url }) => {
	const backgroundColor = color

	const overallSaturation = color
		.slice(1)
		.match(/.{1,2}/g) // split every two characters
		.map(n => parseInt(n, 16)) // transform to decimal
		.map(n => 255 - n) // compute distance from maximum saturation
		.reduce((acc, val) => acc + val, 0) // sum the parts together

	const foregroundColor = overallSaturation > 255
		? `white`
		: `inherit`

	return (
		<a
			className="block px-3 py-2 mr-2 mb-2 font-normal underline-none text-sm leading-none"
			style={{ backgroundColor, color: foregroundColor }}
			href={url}
			target="_blank"
			rel="nofollow noopener noreferrer"
		>
			<Image className="mr-1 align-top" image={icon} fixed aria-hidden="true" style={{ width: `16px` }} />
			{label}
		</a>
	)
}

SocialCard.propTypes = {
	icon: CustomPropTypes.imageSharp.orString,
	label: PropTypes.string,
	color: PropTypes.string,
	url: PropTypes.string,
}

const Socials = ({ previewData }) => {
	const { markdownRemark } = previewData || useStaticQuery(graphql`
		{
			markdownRemark(
				fileAbsolutePath: { regex: "//content/meta/about.md$/" }
			) {
				frontmatter {
					socials {
						icon {
							childImageSharp {
								fixed(width: 16, quality: 90) {
									...GatsbyImageSharpFixed
								}
							}
						}
						label
						color
						url
					}
				}
			}
		}
	`)
	return (
		<div className="flex flex-wrap">
			{markdownRemark.frontmatter.socials.map(SocialCard)}
		</div>
	)
}

Socials.propTypes = {
	previewData: PropTypes.shape({
		markdownRemark: PropTypes.shape({
			frontmatter: PropTypes.shape({
				socials: PropTypes.arrayOf(PropTypes.shape(SocialCard.propTypes)),
			}),
		}),
	}),
}

export default Socials
