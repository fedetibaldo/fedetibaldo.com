import React from 'react'
import { Link } from 'gatsby'
import { Layout } from '../components/layout'
import { withLocalization } from '../components/higher-order'

const NotFoundPage = () => (
	<Layout>
		<article className="content container space-around text-center">
			<h1 className="content-title">Error 404</h1>
			<section className="content-body">
                Page not found, <Link to="/">return home</Link> to start over
			</section>
		</article>
	</Layout>
)

export default withLocalization(NotFoundPage)
