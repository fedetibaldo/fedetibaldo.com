import React from "react"
import PropTypes from "prop-types"
import { Router } from "@reach/router"

import Post from "../templates/post"
import Page from "../templates/page"

import GhostAdminAPI from "@tryghost/admin-api"

import { locales, defaultLocale } from "../utils/siteConfig"

const api = new GhostAdminAPI({
    url: process.env.GATSBY_GHOST_ADMIN_URL,
    key: process.env.GATSBY_GHOST_ADMIN_KEY,
    version: `v3`,
})

const docTypes = [
    {
        name: `post`,
        endpoint: api.posts,
        element: Post,
    },
    {
        name: `page`,
        endpoint: api.pages,
        element: Page,
    },
]

class PreviewPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            document: null,
            type: null,
        }
    }
    async componentDidMount() {
        // endpoints path params
        const browseParams = {
            fields: `id,uuid`,
        }
        const readParams = {
            formats: `html`,
        }

        // retrieve a brief list of documents
        const endpoints = docTypes.map(docType => docType.endpoint)
        const requests = endpoints.map(endpoint => endpoint.browse(browseParams))
        const responses = await Promise.all(requests)

        // find the document whose uuid matches the path parameter
        let type = null,
            id = null

        for (let i = 0; i < responses.length; i++) {
            let document = responses[i].find(document => document.uuid === this.props.document)
            if (document) {
                type = docTypes[i]
                id = document.id
                break
            }
        }

        if (id) {
            // get the full document
            const document = await type.endpoint.read({ id }, readParams)

            // store state
            this.setState({ document, type })
        }
    }
    render() {
        // when ghost answers back
        if (this.state.document !== null) {
            const data = {
                allGhostPost: {
                    edges: [
                        { node: this.state.document },
                    ],
                },
                ghostPage: this.state.document,
            }
            const location = this.props.location
            const slug = this.state.document.slug
            const locale = this.state.document.tags.reduce((detectedLocale, tag) => {
                if (locales.includes(tag.slug)) {
                    detectedLocale = tag.slug
                }
                return detectedLocale
            }, defaultLocale)
            const DocElement = this.state.type.element
            return (<DocElement data={data} location={location} pageContext={{ locale, slug }} />)
        }
        return null
    }
}

PreviewPage.propTypes = {
    document: PropTypes.string,
    location: PropTypes.object,
}

const Preview = () => (
    <>
        <Router>
            <PreviewPage path="/preview/:document" />
        </Router>
    </>
)

export default Preview
