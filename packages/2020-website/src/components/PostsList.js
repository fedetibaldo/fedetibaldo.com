import React from 'react'
import PropTypes from 'prop-types'

import { PostCard, PostDivider } from '.'

const PostsList = ({ posts }) => (
	<>
		{posts.map(({ node }) => (
			// The tag below includes the markup for each post - components/PostCard.js
			<PostCard key={node.id} post={node} />
		))}
		<div className="content ml-auto w-2/3 lg:w-auto lg:pl-6 lg:ml-40">
			<PostDivider id="eof" />
		</div>
	</>
)

PostsList.propTypes = {
	posts: PropTypes.array.isRequired,
}

export default PostsList
