import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import { useIntl } from 'react-intl'

import { getLocalizedUrl } from '../../utils/localization'

const PostCard = ({ post }) => {
    const intl = useIntl()
    const url = getLocalizedUrl(intl.locale, post.slug)
    const pubDate = new Date(post.published_at)

    return (
        <article className="flex" itemScope itemType="http://schema.org/Article">

            <meta itemProp="author" content={post.primary_author.name} />
            <meta itemProp="mainEntityOfPage" content="false" />
            <meta itemProp="dateModified" content={post.updated_at} />

            <Img
                className="card-image w-1/3 lg:w-40 flex-shrink-0 h-auto"
                fixed={post.localImage.childImageSharp.fixed}
                objectFit="cover"
                alt={post.title}
            />

            <section className="content lg:pl-6">
                <time className="block relative border-t text-sm text-gray-400" itemProp="datePublished" dateTime={post.published_at}>
                    <span className="absolute center px-2 bg-white">{pubDate.toLocaleDateString()}</span>
                </time>

                <div className="my-8">
                    <h2 className="mb-2" itemProp="headline">
                        <Link to={url} className="text-2xl" itemProp="url">
                            {post.title}
                        </Link>
                    </h2>

                    <p itemProp="description">{post.excerpt}</p>
                </div>
            </section>

        </article>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        // Basic Info
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        localImage: PropTypes.object,
        excerpt: PropTypes.string.isRequired,
        // Dates
        published_at: PropTypes.string,
        updated_at: PropTypes.string,
        // Author
        primary_author: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
}

export default PostCard
