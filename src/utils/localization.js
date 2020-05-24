const { mainLanguage } = require(`./siteConfig`)

function getLocalizedUrl(locale = mainLanguage, slug = ``) {
    const path = []

    if (locale !== mainLanguage) {
        path.push(`${locale}`)
    }
    path.push(`${slug}`)

    return `/${path.join(`/`)}`
}

module.exports = {
    getLocalizedUrl,
}
