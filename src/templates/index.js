import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout, PostCard, Pagination } from '../components/common'
import { MetaData } from '../components/common/meta'

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
            <MetaData location={location} />
            <Layout isHome={true}>

                {/* markdown embed. Customize in `src/markdown-embeds` */}
                <article className="content container">
                    <Title>
                        {embed.frontmatter.title}
                    </Title>
                    <section dangerouslySetInnerHTML={ { __html: embed.html } } />
                </article>

                {/* post feed */}
                <section className="container">
                    {posts.map(({ node }) => (
                        // The tag below includes the markup for each post - components/common/PostCard.js
                        <PostCard key={node.id} post={node} />
                    ))}
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
    query GhostPostQuery($limit: Int!, $skip: Int!, $localeTag: String!, $locale: String!) {
        allGhostPost(
            sort: { order: DESC, fields: [published_at] },
            limit: $limit,
            skip: $skip,
            filter: { tags: { elemMatch: { name: { eq: $localeTag } } } }
        ) {
            edges {
                node {
                ...GhostPostFields
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
