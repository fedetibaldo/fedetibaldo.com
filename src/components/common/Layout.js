import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'

import { Navigation, LanguageSwitcher } from '.'
import config from '../../utils/siteConfig'
import { getLocalizedUrl } from '../../utils/localization'

// Styles
import '../../styles/app.css'

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

    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <body className={bodyClass} />
            </Helmet>

            <header>
                <Link to={getLocalizedUrl()}>
                    {site.title}
                </Link>
                <hr />
                <LanguageSwitcher />
            </header>

            <main>
                {/* All the main content gets inserted here, index.js, post.js */}
                {children}
            </main>

            {/* The footer at the very bottom of the screen */}
            <footer>
                <Navigation data={site.navigation} />
                <p>{config.credits}</p>
                <p>{config.copyright}</p>
            </footer>
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
