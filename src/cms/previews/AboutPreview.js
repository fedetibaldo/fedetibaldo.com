import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { About } from '../../components'

export default class AboutPreview extends React.Component {
	static propTypes = {
		entry: ImmutablePropTypes.map,
		getAsset: PropTypes.func,
	}
	render() {
		const { entry, getAsset } = this.props
		const data = {
			markdownRemark: {
				frontmatter: {
					intro: entry.get(`data`).get(`intro`),
					socials: entry.get(`data`).get(`socials`).map((social) => {
						return {
							icon: getAsset(social.get(`icon`)).toString(),
							label: social.get(`label`),
							color: social.get(`color`),
							url: social.get(`url`),
						}
					}),
				},
			},
		}
		return (<About previewData={data} />)
	}
}
