import React from 'react'
import PropTypes from 'prop-types'

import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import { useIntl } from 'react-intl'

import { Navigation, LocaleSwitcher } from '..'
import config from '../../utils/siteConfig'
import { getLocalizedUrl } from '../../utils/localization'

/**
* Main layout component
*
* The Layout component wraps around each page and template.
* It also provides the header, footer as well as the main
* styles, and meta data for each page.
*
*/
const DefaultLayout = ({ data, children, bodyClass /*, isHome */ }) => {
	const site = data.allGhostSettings.edges[0].node
	const intl = useIntl()

	return (
		<>
			<Helmet>
				<html lang={intl.locale} />
				<style type="text/css">{`${site.codeinjection_styles}`}</style>
				<body className={bodyClass} />
			</Helmet>

			{/*
				Apparently, the content is not a direct child of the body, hence we must wrap the
				page in yet another container. This way, we can apply the Holy Grail Layout
				@see https://philipwalton.github.io/solved-by-flexbox/demos/holy-grail/
			*/}
			<div className="flex flex-col min-h-screen">

				{/* The header features a  bottom line that spans the whole width of the page */}
				<header className="sticky top-0 z-10 bg-white border-b py-4 lg:py-3">
					<div className="content container flex items-center">

						{/* Site name */}
						<h1 className="logo">
							<Link className="underline-none" to={getLocalizedUrl(intl.locale)}>
								{site.title}
							</Link>
						</h1>

						{/* Keep the two elements far apart */}
						<hr className="border-0 my-0 flex-grow" />

						{/* Locale switcher */}
						<LocaleSwitcher />

					</div>
				</header>

				{/* All the main content gets inserted here, index.js, post.js */}
				<main className="flex-grow">
					{children}
				</main>

				{/* The footer at the very bottom of the screen */}
				<footer className="content container text-center text-xs mb-3">

					{/* A list of useful links */}
					<Navigation data={site.navigation} />

					<div className="text-gray-400">
						{/* Copyright and credits */}
						<p className="my-1">{config.credits}</p>
						<p className="my-1">{config.copyright}</p>
					</div>

				</footer>

			</div>
		</>
	)
}

DefaultLayout.propTypes = {
	children: PropTypes.node.isRequired,
	data: PropTypes.shape({
		file: PropTypes.object,
		allGhostSettings: PropTypes.object.isRequired,
	}).isRequired,
	bodyClass: PropTypes.string,
	isHome: PropTypes.bool,
}

const DefaultLayoutSettingsQuery = props => (
	<StaticQuery
		query={graphql`
			query GhostSettings {
				allGhostSettings {
					edges {
						node {
							...GhostSettingsFields
						}
					}
				}
				file(relativePath: {eq: "ghost-icon.png"}) {
					childImageSharp {
						fixed(width: 30, height: 30) {
							...GatsbyImageSharpFixed
						}
					}
				}
			}
		`}
		render={data => <DefaultLayout data={data} {...props} />}
	/>
)

export default DefaultLayoutSettingsQuery
