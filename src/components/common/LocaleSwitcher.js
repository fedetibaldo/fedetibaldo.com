import React, { useContext } from 'react'
import { Link } from 'gatsby'

import config from '../../utils/siteConfig'
import { getLocalizedUrl } from '../../utils/localization'
import { LocaleContext } from '../../contexts/locale'

/**
 * Renders a list of links to the many localized homepages.
 * Sets the link class according to the current locale
 */
const LocaleSwitcher = () => {
    const currentLocale = useContext(LocaleContext)

    return (
        <>
            {
                config.locales.map(locale => (
                    <Link
                        to={getLocalizedUrl(locale)}
                        key={locale}
                        className={locale === currentLocale ? `current` : ``}
                    >
                        {locale}
                    </Link>
                ))
            }
        </>
    )
}

export default LocaleSwitcher
