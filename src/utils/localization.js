/**
 * Language store and utility functions
 * Used both by `gatsby-node` and by the language aware templates
 * @see /src/components/abstract/LanguageAwareTemplate
 */
const config = require(`./siteConfig`)

/** @private */
const store = {
    language: config.mainLanguage,
}

/**
 * Getter and setter
 */
function getLanguage() {
    return store.language
}
function setLanguage(language) {
    store.language = language
}

function getLocalizedUrl(slug = ``, language = getLanguage()) {
    const path = []

    if (language !== config.mainLanguage) {
        path.push(`${language}`)
    }
    path.push(`${slug}`)

    return `/${path.join(`/`)}`
}

module.exports = {
    setLanguage,
    getLanguage,
    getLocalizedUrl,
}
