import React from 'react'
import PropTypes from 'prop-types'

import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import { FormattedMessage, useIntl } from 'react-intl'

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
				<header className="sticky top-0 z-10 bg-white">
                    <div className="bg-yellow-200 py-3 lg:py-2 border-b border-yellow-400">
                        <p className="text-sm container content text-center">
                            <FormattedMessage id="goodbyeWebsite" />{' '}
                            <br className="lg:hidden" />
                            <a className="underline-yellow-400" href="/" rel="nofollow">
                                <FormattedMessage id="mostRecentWebsite" />
                            </a>
                        </p>
                    </div>
					<div className="content container flex items-center py-4 lg:py-3 border-b">

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
						<p className="my-1 flex justify-center items-center space-x-1">
							<svg aria-label="cc" className="fill-current w-3 h-3" version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="5.5 -3.5 64 64"><path d="M37.4-3.5a31.2 31.2 0 0129.8 19.7 32.6 32.6 0 010 24.6 32.9 32.9 0 01-29.7 19.7A31.1 31.1 0 0114.8 51 31.9 31.9 0 0137.4-3.5zm.2 5.8C30.2 2.3 24 4.8 19 9.9a27.5 27.5 0 00-5.8 8.6 25.2 25.2 0 000 20 26.5 26.5 0 0043 8.3c5-4.8 7.4-11 7.4-18.3A26.3 26.3 0 0056.1 10a25.3 25.3 0 00-18.5-7.7zm-.4 20.9l-4.3 2.2c-.5-1-1-1.6-1.7-2-.7-.4-1.3-.6-1.9-.6-2.8 0-4.3 2-4.3 5.7 0 1.7.4 3 1.1 4.1.7 1 1.8 1.6 3.2 1.6 1.9 0 3.2-1 4-2.8l4 2a9.4 9.4 0 01-8.5 5c-2.8 0-5.2-.8-6.9-2.6a9.9 9.9 0 01-2.6-7.3c0-3 .9-5.5 2.6-7.3a9 9 0 016.7-2.6c4 0 6.8 1.5 8.6 4.6zm18.4 0l-4.2 2.2c-.5-1-1-1.6-1.7-2-.7-.4-1.3-.6-2-.6-2.8 0-4.2 2-4.2 5.7 0 1.7.4 3 1 4.1.8 1 1.9 1.6 3.3 1.6 1.8 0 3.2-1 4-2.8l4 2c-1 1.6-2.1 2.8-3.6 3.7a9.2 9.2 0 01-4.9 1.3c-2.9 0-5.2-.8-7-2.6a10 10 0 01-2.5-7.3c0-3 .9-5.5 2.6-7.3a9 9 0 016.8-2.6c4 0 6.7 1.5 8.4 4.6z"/></svg>
							<svg aria-label="by" className="fill-current w-3 h-3" version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="5.5 -3.5 64 64"><path d="M37.4-3.5c9 0 16.6 3 22.8 9.3a31 31 0 019.3 22.7c0 9-3 16.5-9.1 22.5a31.6 31.6 0 01-23 9.5A31 31 0 0115 51.1a30.8 30.8 0 01-9.4-22.6c0-8.8 3.1-16.3 9.4-22.7a30.6 30.6 0 0122.5-9.3zm.2 5.8A25 25 0 0019 9.9a25.7 25.7 0 000 37 25.3 25.3 0 0018.5 7.8c7 0 13.3-2.6 18.6-7.9 5-4.8 7.5-11 7.5-18.3 0-7.3-2.5-13.5-7.6-18.6a25.2 25.2 0 00-18.5-7.6zM46 20.6v13h-3.6v15.6h-10V33.6H29v-13c0-.6.2-1.1.6-1.5a2 2 0 011.4-.6h13.2c.5 0 1 .2 1.4.6.4.4.6.9.6 1.5zm-13-8.3c0-3 1.4-4.5 4.4-4.5S42 9.3 42 12.3s-1.5 4.5-4.5 4.5-4.5-1.5-4.5-4.5z"/></svg>
							<svg aria-label="nc" className="fill-current w-3 h-3" version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="5.5 -3.5 64 64"><path d="M37.4-3.5c9 0 16.6 3 22.8 9.3a30.8 30.8 0 019.3 22.7c0 9-3 16.5-9.1 22.5a31.6 31.6 0 01-45.5 0 30.7 30.7 0 01-9.4-22.5c0-8.8 3.1-16.3 9.4-22.7a30.6 30.6 0 0122.5-9.3zM12.7 19.9c-1 2.6-1.4 5.5-1.4 8.6 0 7 2.6 13.2 7.7 18.4a25.5 25.5 0 0018.6 7.7c7.2 0 13.4-2.6 18.6-7.8 1.9-1.8 3.3-3.7 4.4-5.6l-12-5.4c-.5 2-1.5 3.7-3.1 5-1.7 1.2-3.6 2-5.8 2.2v4.9H36v-5c-3.5 0-6.8-1.3-9.7-3.8l4.4-4.4c2 2 4.5 2.9 7.1 2.9 1.1 0 2-.3 2.9-.8.8-.5 1.1-1.3 1.1-2.4 0-.8-.2-1.5-.8-2l-3.1-1.3-3.8-1.7-5-2.2-16.4-7.3zM37.6 2.2C30.3 2.2 24 4.8 19 10a30.6 30.6 0 00-3.5 4.3l12.2 5.5c.5-1.7 1.5-3 3-4S34 14 36 14V9h3.7v5c3 .1 5.6 1.1 8 3l-4.1 4.2a9.5 9.5 0 00-5.5-1.8 6 6 0 00-2.7.5c-.8.4-1.2 1-1.2 2l.3.8 4 1.8 2.9 1.3 5.1 2.2L63 35.4c.6-2.3.8-4.6.8-6.9a25 25 0 00-7.6-18.6 25 25 0 00-18.5-7.7z"/></svg>
							<a className="font-normal underline-none" href="https://creativecommons.org/licenses/by-nc/4.0/" rel="nofollow">{config.copyright}</a>
						</p>
						<p className="my-1">{config.owner}</p>
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
