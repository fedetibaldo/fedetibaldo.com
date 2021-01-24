import React from 'react'
import PropTypes from 'prop-types'
import { graphql, useStaticQuery } from 'gatsby'

import { Title } from './content'
import { Socials } from '.'

const About = ({ previewData }) => {
	const { markdownRemark } = previewData || useStaticQuery(graphql`
		{
			markdownRemark(
				fileAbsolutePath: { regex: "//content/meta/about.md$/" }
			) {
				frontmatter {
					intro
				}
			}
		}
	`)

	return (
		<article className="content container space-around">
			<Title>About</Title>
			<p className="mb-4">
				{markdownRemark.frontmatter.intro}
			</p>
			<Socials previewData={previewData} />
		</article>
	)
}

About.propTypes = {
	previewData: PropTypes.shape({
		markdownRemark: PropTypes.shape({
			frontmatter: PropTypes.shape({
				intro: PropTypes.string,
				socials: PropTypes.array,
			}),
		}),
	}),
}

export default About
