import React from 'react'
import { Link } from 'gatsby'
import { Layout } from '../components/layout'
import { withLocalization } from '../components/higher-order'
import { FormattedMessage } from 'react-intl'
import { Title } from '../components/styled'
import { getLocalizedUrl } from '../utils/localization'

const NewsletterThankYou = () => (
	<Layout>
		<article className="content container space-around text-center">
			<Title>
				<FormattedMessage id="thankYou" />
			</Title>
			<section>
				<FormattedMessage id="xoxo" />
			</section>
			<Link to={getLocalizedUrl()}>
				<FormattedMessage id="returnHome" />
			</Link>
		</article>
	</Layout>
)

export default withLocalization(NewsletterThankYou)
