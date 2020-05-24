import { createContext } from 'react'
import { mainLocale } from '../utils/siteConfig'

const LocaleContext = createContext(mainLocale)

export {
    LocaleContext,
}
