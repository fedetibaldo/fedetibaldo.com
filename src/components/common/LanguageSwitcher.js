import React from 'react'
import { Link } from 'gatsby'

import config from '../../utils/siteConfig'
import { getLanguage, getLocalizedUrl } from '../../utils/localization'

/**
 * Renders a list of links to the many localized homepages.
 * Sets the link class according to the current language
 * @see /src/utils/localization
 */
class LanguageSwitcher extends React.Component {
    renderLanguageLink(language) {
        const activeClass = `current`
        const isActive = language === getLanguage()
        return (
            <Link to={getLocalizedUrl(``, language)} key={language} className={isActive && activeClass || ``}>
                {language}
            </Link>
        )
    }
    render() {
        return config.languages.map(language => this.renderLanguageLink(language))
    }
}

export default LanguageSwitcher
