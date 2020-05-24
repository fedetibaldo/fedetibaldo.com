import { createContext } from 'react'
import { mainLanguage } from '../utils/siteConfig'

const LocaleContext = createContext(mainLanguage)

export {
    LocaleContext,
}
