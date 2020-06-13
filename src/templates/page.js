import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/layout'
import { MetaData } from '../components/meta'

import { withLocalization } from '../components/higher-order'
import { Title } from '../components/styled'

/**
* Single page (/:slug)
*
* This file renders a single page and loads all the content.
*
*/
const Page = ({ data, location }) => {
    const page = data.ghostPage
    const content = page.childHtmlRehype
        ? page.childHtmlRehype.html
        : page.html

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="website"
            />
            <Helmet>
                <style type="text/css">{`${page.codeinjection_styles}`}</style>
            </Helmet>
            <Layout>
                <article className="content container space-around">
                    <Title>{page.title}</Title>

                    {/* The main page content */}
                    <section dangerouslySetInnerHTML={{ __html: content }} />
                </article>
            </Layout>
        </>
    )
}

Page.propTypes = {
    data: PropTypes.shape({
        ghostPage: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string,
            childHtmlRehype: PropTypes.shape({
                html: PropTypes.string,
            }),
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default withLocalization(Page)

export const postQuery = graphql`
    query($slug: String!) {
        ghostPage(slug: { eq: $slug }) {
            ...GhostPageFields
        }
    }
`
