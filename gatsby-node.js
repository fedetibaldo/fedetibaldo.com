const path = require(`path`)
const { postsPerPage, locales } = require(`./src/utils/siteConfig`)
const { getLocalizedUrl } = require(`./src/utils/localization`)
const { paginate } = require(`gatsby-awesome-pagination`)

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
    const config = getConfig()
    config.node = { fs: `empty` }
    // This will completely replace the webpack config with the modified object.
    actions.replaceWebpackConfig(config)
}

/**
 * Here is the place where Gatsby creates the URLs for all the
 * posts, tags, pages and authors that we fetched from the Ghost site.
 */
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    await Promise.all(locales.map(async (locale) => {
        // Retrieve localized pages and posts by tag
        const result = await graphql(`
        {
            allGhostPost (
                sort: {
                    order: ASC,
                    fields: published_at
                },
                filter: {
                    tags: {
                        elemMatch: {
                            slug: { eq: "${locale}" }
                        }
                    }
                }
            ) {
                edges {
                    node {
                        slug
                    }
                }
            }
            allGhostPage(
                sort: {
                    order: ASC,
                    fields: published_at
                },
                filter: {
                    tags: {
                        elemMatch: {
                            slug: { eq: "${locale}" }
                        }
                    }
                }
            ) {
                edges {
                    node {
                        slug
                    }
                }
            }
        }
        `)

        // Check for any errors
        if (result.errors) {
            throw new Error(result.errors)
        }

        // Extract query results
        const pages = result.data.allGhostPage.edges
        const posts = result.data.allGhostPost.edges

        // Load templates
        const indexTemplate = path.resolve(`./src/templates/index.js`)
        const pageTemplate = path.resolve(`./src/templates/page.js`)
        const postTemplate = path.resolve(`./src/templates/post.js`)

        function createDocument({ node, template }) {
            node.url = getLocalizedUrl(locale, node.slug)

            createPage({
                path: node.url,
                component: template,
                context: {
                    slug: node.slug,
                    locale,
                },
            })
        }

        // Create pages
        pages.forEach(({ node }) => createDocument({ node, template: pageTemplate }))
        // Create post pages
        posts.forEach(({ node }) => createDocument({ node, template: postTemplate }))

        // Create pagination
        paginate({
            createPage,
            items: posts,
            itemsPerPage: postsPerPage,
            component: indexTemplate,
            pathPrefix: ({ pageNumber }) => {
                if (pageNumber === 0) {
                    return getLocalizedUrl(locale)
                } else {
                    return getLocalizedUrl(locale, `page`)
                }
            },
            context: {
                locale,
            },
        })
    }))
}
