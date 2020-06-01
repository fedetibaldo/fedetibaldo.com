import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import { getLocalizedUrl } from '../../utils/localization'
import { LocaleContext } from '../../contexts/locale'

const PostCard = ({ post }) => {
    const locale = useContext(LocaleContext)
    const url = getLocalizedUrl(locale, post.slug)
    const pubDate = new Date(post.published_at)

    return (
        <article className="flex" itemScope itemType="http://schema.org/Article">

            <meta itemProp="author" content={post.primary_author.name} />
            <meta itemProp="mainEntityOfPage" content="false" />
            <meta itemProp="dateModified" content={post.updated_at} />

            <picture className="w-1/3 lg:w-40 flex-shrink-0">
                <img className="w-full h-full object-cover" itemProp="image" src={post.feature_image} />
            </picture>

            <section className="content lg:pl-6">
                <time className="block relative border-t" itemProp="datePublished" dateTime={post.published_at}>
                    <span className="absolute center px-2 bg-white">{pubDate.toLocaleDateString()}</span>
                </time>

                <div className="my-8">
                    <h2 itemProp="headline">
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
        feature_image: PropTypes.string,
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
