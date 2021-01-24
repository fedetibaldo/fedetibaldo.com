import React from 'react'
import { Layout } from '../components/layout'
import { withLocalization } from '../components/higher-order'
import About from '../components/About'

const Home = () => (
	<Layout>
		<About />
	</Layout>
)

export default withLocalization(Home)
