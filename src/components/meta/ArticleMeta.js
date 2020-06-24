import React from 'react'
import Helmet from "react-helmet"
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import _ from 'lodash'
import url from 'url'

import getAuthorProperties from './getAuthorProperties'
import { getHeadInjections } from './getHeadInjections'
import ImageMeta from './ImageMeta'
import config from '../../utils/siteConfig'

import { tags as tagsHelper } from '@tryghost/helpers'

const ArticleMetaGhost = ({ post = {}, settings, canonical }) => {
	settings = settings.allGhostSettings.edges[0].node

	const author = getAuthorProperties(post.primary_author)
	const publicTags = _.map(tagsHelper(post, { visibility: `public`, fn: tag => tag }), `name`)
	const primaryTag = publicTags[0] || ``
	const shareImage = post.localImage ? post.localImage : _.get(settings, `localImage`, null)
	const publisherLogo = url.resolve(config.siteUrl, config.siteIcon)
	const shareImageUrl = shareImage ? url.resolve(config.siteUrl, shareImage.childImageSharp.fixed.src) : null

	const jsonLd = {
		"@context": `https://schema.org/`,
		"@type": `Article`,
		author: {
			"@type": `Person`,
			name: author.name,
			image: author.image ? author.image : undefined,
			sameAs: author.sameAsArray ? author.sameAsArray : undefined,
		},
		keywords: publicTags.length ? publicTags.join(`, `) : undefined,
		headline: post.meta_title || post.title,
		url: canonical,
		datePublished: post.published_at,
		dateModified: post.updated_at,
		image: shareImage ? {
			"@type": `ImageObject`,
			url: shareImageUrl,
			width: shareImage.childImageSharp.fixed.width,
			height: shareImage.childImageSharp.fixed.height,
		} : undefined,
		publisher: {
			"@type": `Organization`,
			name: settings.title,
			logo: {
				"@type": `ImageObject`,
				url: publisherLogo,
				width: 100,
				height: 100,
			},
		},
		description: post.meta_description || post.excerpt,
		mainEntityOfPage: {
			"@type": `WebPage`,
			"@id": config.siteUrl,
		},
	}

	return (
		<>
			<Helmet>
				<title>{post.meta_title || post.title}</title>
				<meta name="description" content={post.meta_description || post.excerpt} />
				<link rel="canonical" href={canonical} />

				<meta property="og:site_name" content={settings.title} />
				<meta property="og:type" content="article" />
				<meta property="og:title"
					content={
						post.og_title ||
						post.meta_title ||
						post.title
					}
				/>
				<meta property="og:description"
					content={
						post.og_description ||
						post.excerpt ||
						post.meta_description
					}
				/>
				<meta property="og:url" content={canonical} />
				<meta property="article:published_time" content={post.published_at} />
				<meta property="article:modified_time" content={post.updated_at} />
				{publicTags.map((keyword, i) => (<meta property="article:tag" content={keyword} key={i} />))}
				{author.facebookUrl && <meta property="article:author" content={author.facebookUrl} />}

				<meta name="twitter:title"
					content={
						post.twitter_title ||
						post.meta_title ||
						post.title
					}
				/>
				<meta name="twitter:description"
					content={
						post.twitter_description ||
						post.excerpt ||
						post.meta_description
					}
				/>
				<meta name="twitter:url" content={canonical} />
				<meta name="twitter:label1" content="Written by" />
				<meta name="twitter:data1" content={author.name} />
				{primaryTag && <meta name="twitter:label2" content="Filed under" />}
				{primaryTag && <meta name="twitter:data2" content={primaryTag} />}

				{settings.twitter && <meta name="twitter:site" content={`https://twitter.com/${settings.twitter.replace(/^@/, ``)}/`} />}
				{settings.twitter && <meta name="twitter:creator" content={settings.twitter} />}
				<script type="application/ld+json">{JSON.stringify(jsonLd, undefined, 4)}</script>
				{getHeadInjections(post.headAst)}
			</Helmet>
			<ImageMeta image={shareImageUrl} />
		</>
	)
}

ArticleMetaGhost.propTypes = {
	post: PropTypes.shape({
		title: PropTypes.string.isRequired,
		published_at: PropTypes.string,
		updated_at: PropTypes.string.isRequired,
		meta_title: PropTypes.string,
		meta_description: PropTypes.string,
		primary_author: PropTypes.object.isRequired,
		localImage: PropTypes.object,
		tags: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string,
				slug: PropTypes.string,
				visibility: PropTypes.string,
			})
		),
		primaryTag: PropTypes.shape({
			name: PropTypes.string,
		}),
		og_title: PropTypes.string,
		og_description: PropTypes.string,
		twitter_title: PropTypes.string,
		twitter_description: PropTypes.string,
		excerpt: PropTypes.string.isRequired,
		headAst: PropTypes.object,
	}).isRequired,
	settings: PropTypes.shape({
		logo: PropTypes.object,
		title: PropTypes.string,
		twitter: PropTypes.string,
		allGhostSettings: PropTypes.object.isRequired,
	}).isRequired,
	canonical: PropTypes.string.isRequired,
}

const ArticleMetaQuery = props => (
	<StaticQuery
		query={graphql`
			query GhostSettingsArticleMeta {
				allGhostSettings {
					edges {
						node {
							...GhostSettingsFields
							localImage {
								...SocialFeatureImage
							}
						}
					}
				}
			}
		`}
		render={settings => <ArticleMetaGhost settings={settings} {...props} />}
	/>
)

export default ArticleMetaQuery
