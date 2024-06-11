import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { useIntl } from 'react-intl'

function getDistance(now, then, intl) {
	// length of common periods in milliseconds
	const DAY = 1000 * 60 * 60 * 24,
		WEEK = DAY * 7,
		MONTH = DAY * 31,
		YEAR = DAY * 365

	const delta = now - then

	if (delta < DAY) {
		return intl.formatMessage({ id: `today` })
	} else if (delta < DAY * 2) {
		return intl.formatMessage({ id: `yesterday` })
	} else if (delta < WEEK) {
		return intl.formatRelativeTime(-Math.floor(delta / DAY), `day`)
	} else if (delta < MONTH) {
		return intl.formatRelativeTime(-Math.floor(delta / WEEK), `week`)
	} else if (delta < YEAR) {
		return intl.formatRelativeTime(-Math.floor(delta / MONTH), `month`)
	} else {
		return intl.formatDate(then, { year: `numeric`, month: `long` })
	}
}

const PostDivider = ({ date, id, ...props }) => {
	const intl = useIntl()

	let [content, setContent] = useState(id && intl.formatMessage({ id })),
		TagName = `div`

	if (date) {
		const then = new Date(date)

		if (!Number.isNaN(then.valueOf())) {
			useEffect(() => {
				const now = new Date()
				setContent(getDistance(now, then, intl))
			})
			TagName = `time`
			props.dateTime = date
		}
	}

	// return intl.formatTime(then, { year: `numeric`, month: `long`,  })

	return (
		<TagName className="block relative border-t text-sm text-gray-400" {...props}>
			<span className="absolute center px-2 bg-white whitespace-no-wrap">
				{content}
			</span>
		</TagName>
	)
}

PostDivider.propTypes = {
	date: PropTypes.string,
	id: PropTypes.string,
}

export default PostDivider
