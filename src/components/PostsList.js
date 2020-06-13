import React from 'react'
import PropTypes from 'prop-types'

import { PostCard } from '.'

const PostsList = ({ posts }) => (
    <>
        {posts.map(({ node }) => (
            // The tag below includes the markup for each post - components/PostCard.js
            <PostCard key={node.id} post={node} />
        ))}
    </>
)

PostsList.propTypes = {
    posts: PropTypes.array.isRequired,
}

export default PostsList
