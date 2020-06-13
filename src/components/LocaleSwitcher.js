import React from 'react'
import { Link } from 'gatsby'

import { useIntl } from 'react-intl'

import config from '../utils/siteConfig'
import { getLocalizedUrl } from '../utils/localization'

/**
 * Renders a list of links to the many localized homepages.
 * Sets the link class according to the current locale
 */
const LocaleSwitcher = () => {
    const intl = useIntl()
    const currentLocale = intl.locale

    function setLocaleCookie(locale) {
        document.cookie = `nf_lang=${locale};path=/`
    }

    return (
        <nav>
            {
                config.locales.map(locale => (
                    <Link
                        to={getLocalizedUrl(locale)}
                        key={locale}
                        className={[`uppercase ml-2 lg:text-sm`, locale === currentLocale ? `underline-none` : `font-normal`].join(` `)}
                        onClick={setLocaleCookie.bind(null, locale)}
                    >
                        {locale}
                    </Link>
                ))
            }
        </nav>
    )
}

export default LocaleSwitcher
