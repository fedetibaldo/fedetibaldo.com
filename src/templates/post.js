import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'

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
                        /> : null}
                    <section className="content container space-around mt-10">
                        <Title>{post.title}</Title>

                        {/* The main post content */}
                        <section dangerouslySetInnerHTML={{ __html: post.html }} />
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
