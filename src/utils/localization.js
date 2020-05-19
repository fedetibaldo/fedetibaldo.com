const config = require(`./siteConfig`)

const getLocalizedUrl = function getLocalizedUrl(language, slug = ``) {
    const pathPrefix = language === config.mainLanguage
        ? ``
        : `/${language}`

    return `${pathPrefix}/${slug}`
}

module.exports = {
    getLocalizedUrl,
}
