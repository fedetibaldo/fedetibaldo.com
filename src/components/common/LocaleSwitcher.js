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
