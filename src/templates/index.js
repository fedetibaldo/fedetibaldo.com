import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { FormattedMessage } from 'react-intl'

import { Layout } from '../components/layout'
import { PostsList, Pagination, Socials } from '../components'
import { MetaData } from '../components/meta'

import { withLocalization } from '../components/higher-order'
import { Title } from '../components/styled'

/**
 * Main index page (home page)
 *
 * Loads all posts from Ghost and uses pagination to navigate through them.
 * Filters the content based on the `localeTag` prop
 * The number of posts that should appear per page can be setup
 * in /utils/siteConfig.js under `postsPerPage`.
 *
 */
const Index = ({ data, location, pageContext }) => {
	const posts = data.allGhostPost.edges
	const embed = data.markdownRemark

	return (
		<>
			<MetaData
				location={location}
				title="Home"
			/>
			<Layout isHome={true}>

				{/* markdown embed. Customize in `src/markdown-embeds` */}
				<article className="content container space-around">
					<Title>
						{embed.frontmatter.title}
					</Title>
					<section className="mb-4" dangerouslySetInnerHTML={{ __html: embed.html }} />
					<Socials />
				</article>

				{/* post feed */}
				<section className="container space-around">

					<Title className="mb-6 content"><FormattedMessage id="recent" /></Title>

					<PostsList posts={posts} />

				</section>

				<Pagination pageContext={pageContext} />
			</Layout>
		</>
	)
}

Index.propTypes = {
	data: PropTypes.shape({
		allGhostPost: PropTypes.object.isRequired,
		markdownRemark: PropTypes.object.isRequired,
	}).isRequired,
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired,
	}).isRequired,
	pageContext: PropTypes.object,
}

export default withLocalization(Index)

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
    query GhostPostQuery($limit: Int!, $skip: Int!, $locale: String!) {
        allGhostPost(
            sort: { order: DESC, fields: [published_at] },
            limit: $limit,
            skip: $skip,
            filter: { tags: { elemMatch: { slug: { eq: $locale } } } }
        ) {
            edges {
                node {
                    ...GhostPostFields
                    localImage {
                        ...CardFeatureImage
                    }
                }
            }
        }
        markdownRemark(
            frontmatter: {
                slug: { eq: "/" },
                locale: { eq: $locale },
            }
        ) {
            frontmatter {
                title
            }
            html
        }
    }
`
