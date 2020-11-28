import React from 'react'
import { graphql, Link } from 'gatsby'
import { Layout } from '../components/layout'
import { withLocalization } from '../components/higher-order'

const Home = ({ data }) => (
    <Layout>
        <article className="content container space-around text-center">
            <h1 className="content-title">
                <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
            </h1>
            <section className="content-body">
                Page not found, <Link to="/">return home</Link> to start over
			</section>
        </article>
    </Layout>
)

export const query = graphql`
    query HomeQuery {
        markdownRemark(frontmatter: {title: {eq: "Dummy Post"}}) {
            html
        }
    }
`;

export default withLocalization(Home)
