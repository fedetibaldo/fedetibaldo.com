import React from 'react'
import PropTypes from 'prop-types'

import { setLanguage } from '../../utils/localization'

/**
 * This is ought to be extended by the templates that act as entrypoints
 * Sets the current language before being mounted, based on the `language` prop
 */
class LanguageAwareTemplate extends React.Component {
    componentWillMount() {
        const { pageContext } = this.props
        setLanguage(pageContext.language)
    }
}

LanguageAwareTemplate.propTypes = {
    pageContext: PropTypes.shape({
        language: PropTypes.string.isRequired,
    }),
}

export default LanguageAwareTemplate
