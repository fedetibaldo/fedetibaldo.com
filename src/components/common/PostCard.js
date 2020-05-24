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
        <article itemScope itemType="http://schema.org/Article">

            <meta itemProp="author" content={post.primary_author.name} />
            <meta itemProp="mainEntityOfPage" content="false" />

            <picture>
                <img itemProp="image" src={post.feature_image} />
            </picture>

            <time itemProp="datePublished" dateTime={post.published_at}>{pubDate.toLocaleDateString()}</time>
            <meta itemProp="dateModified" content={post.updated_at} />

            <h2 itemProp="headline">
                <Link to={url} itemProp="url">
                    {post.title}
                </Link>
            </h2>

            <section itemProp="description">{post.excerpt}</section>

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
