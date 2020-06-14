import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'

import { FormattedDate, FormattedMessage } from 'react-intl'

import { Layout } from '../components/layout'
import { MetaData } from '../components/meta'
import { withLocalization } from '../components/higher-order'
import { Title } from '../components/styled'
import { PostsList, Socials } from '../components'

function getPostBySlug(posts, slug) {
    return posts.edges.find(edge => edge.node.slug === slug)
}

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const Post = ({
    data,
    location,
    pageContext,
}) => {
    // The query includes the current, next, and previous posts
    const posts = data.allGhostPost

    // This is why I've got to find the current post before continuing
    const post = getPostBySlug(posts, pageContext.slug).node

    // Prepare content
    const pubDate = new Date(post.published_at)
    const content = post.childHtmlRehype
        ? post.childHtmlRehype.html
        : post.html

    // Check if it's outdated
    const isOutdated = post.tags.some(tag => tag.slug === `archived`)

    // Collect related posts in a single array
    const relatedPosts = []
    if (pageContext.next) {
        relatedPosts.push(getPostBySlug(posts, pageContext.next))
    }
    if (pageContext.previous) {
        relatedPosts.push(getPostBySlug(posts, pageContext.previous))
    }

    return (
        <>
            <MetaData
                data={{ ghostPost: post }}
                location={location}
                type="article"
            />
            <Helmet>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
            </Helmet>
            <Layout>
                <article>

                    {/* Featured image (previewed posts don't have the localImage node) */}
                    {post.localImage ?
                        <Img
                            className="h-64"
                            fluid={post.localImage.childImageSharp.fluid}
                            objectFit="cover"
                            alt={post.title}
                        /> :
                        post.feature_image ?
                            <picture className="block h-64">
                                <img className="w-full h-full object-cover" src={post.feature_image} alt={post.title} />
                            </picture> :
                            null
                    }

                    <section className="content container space-around mt-10">

                        {/* Post title */}
                        <Title>{post.title}</Title>

                        {isOutdated ?
                            <p className="bg-yellow-200 my-6 p-3 lg:px-6">
                                <FormattedMessage id="outdated" />
                            </p> :
                            null
                        }

                        {/* Publish date */}
                        <time className="block text-gray-400 my-6" dateTime={post.published_at}>
                            &#47;&#47;&nbsp;
                            <FormattedDate
                                value={pubDate}
                                year="numeric"
                                month="long"
                                day="numeric"
                            />
                        </time>

                        {/* The main post content */}
                        <section className="mb-6" dangerouslySetInnerHTML={{ __html: content }} />

                        {/* Farewell */}
                        <p className="italic mb-8">
                            <FormattedMessage id="end" />&nbsp;
                            <a href="https://twitter.com/intent/tweet?text=%40fedetibaldo" rel="nofollow">
                                <FormattedMessage id="tweet" />
                            </a>
                        </p>

                        {/* Social buttons */}
                        <Socials />

                    </section>

                </article>

                {relatedPosts.length ?
                    <section className="container space-around mt-10">

                        <Title className="mb-6 content"><FormattedMessage id="related" /></Title>

                        <PostsList posts={relatedPosts} />

                    </section> :
                    null
                }
            </Layout>
        </>
    )
}

Post.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
    pageContext: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        next: PropTypes.string,
        previous: PropTypes.string,
    }),
}

export default withLocalization(Post)

export const postQuery = graphql`
    query($slug: String!, $next: String, $previous: String) {
        allGhostPost(filter: {
            slug: { in: [$slug, $next, $previous] }
        }) {
            edges {
                node {
                    ...GhostPostFields
                    localImage {
                        ...CardFeatureImage
                        ...PostFeatureImage
                    }
                }
            }
        }
    }
`
