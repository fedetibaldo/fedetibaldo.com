import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'

import { FormattedDate, FormattedMessage } from 'react-intl'

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'

import { withLocalization } from '../components/higher-order'
import { Title } from '../components/styled'

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const Post = ({ data, location }) => {
    const post = data.ghostPost
    const pubDate = new Date(post.published_at)

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="article"
            />
            <Helmet>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
            </Helmet>
            <Layout>
                <article>
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
                        <Title>{post.title}</Title>

                        <time className="block text-gray-400 my-6" itemProp="datePublished" dateTime={post.published_at}>
                            &#47;&#47;&nbsp;
                            <FormattedDate
                                value={pubDate}
                                year="numeric"
                                month="long"
                                day="numeric"
                            />
                        </time>

                        {/* The main post content */}
                        <section dangerouslySetInnerHTML={{ __html: post.html }} />

                        <p className="italic">
                            <FormattedMessage id="end" />&nbsp;
                            <a href="https://twitter.com/intent/tweet?text=%40fedetibaldo" rel="nofollow">
                                <FormattedMessage id="tweet" />
                            </a>
                        </p>

                    </section>
                </article>
            </Layout>
        </>
    )
}

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            localImage: PropTypes.object,
            feature_image: PropTypes.string,
            published_at: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default withLocalization(Post)

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
            localImage {
                ...PostFeatureImage
            }
        }
    }
`
