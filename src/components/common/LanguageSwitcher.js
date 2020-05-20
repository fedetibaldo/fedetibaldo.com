import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import config from '../../utils/siteConfig'
import { getLocalizedUrl } from '../../utils/localization'

class LanguageSwitcher extends React.Component {
    renderLanguageLink(language) {
        const activeClass = `current`
        const isActive = language === this.props.currentLanguage
        return (
            <Link to={getLocalizedUrl(language)} className={isActive && activeClass}>
                {language}
            </Link>
        )
    }
    render() {
        return config.languages.map(language => this.renderLanguageLink(language))
    }
}

LanguageSwitcher.propTypes = {
    currentLanguage: PropTypes.string.isRequired,
}

export default LanguageSwitcher
