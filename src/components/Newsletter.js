import React from 'react'

import { FormattedMessage } from 'react-intl'
import { Title } from './styled'

const Newsletter = () => (
	<form method="POST" className="border-t border-l shadow-teal-200 shadow-skewed p-6 outline-teal-200" name="newsletter" data-netlify action="/newsletter-thank-you">

		<Title tagName="h2" className="mt-0">
			<FormattedMessage id="newsletter" />
		</Title>
		<p className="mb-3">
			<FormattedMessage id="newsletterInfo" />
		</p>

		<label className="font-bold" htmlFor="newsletter_email">
			<FormattedMessage id="email" />
		</label>

		<div className="lg:flex space-y-3 lg:space-y-0 lg:space-x-2 mt-2">
			<input className="block w-full py-2 border-b border-gray-800" id="newsletter_email" type="email" name="email" placeholder="johndoe@example.com" required />
	
			<button className="block w-full lg:w-auto p-2 lg:px-6 uppercase font-bold bg-teal-200 border border-gray-800">
				<FormattedMessage id="submit" />
			</button>
		</div>

	</form>
)

export default Newsletter
