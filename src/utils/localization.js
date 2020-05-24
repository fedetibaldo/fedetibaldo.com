const { mainLocale } = require(`./siteConfig`)

function getLocalizedUrl(locale = mainLocale, slug = ``) {
    const path = []

    if (locale !== mainLocale) {
        path.push(`${locale}`)
    }
    path.push(`${slug}`)

    return `/${path.join(`/`)}`
}

module.exports = {
    getLocalizedUrl,
}
