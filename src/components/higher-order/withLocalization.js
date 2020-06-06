import React from 'react'
import PropTypes from 'prop-types'

import { IntlProvider } from 'react-intl'

import messages from '../../utils/messages'

function withLocalization(WrappedComponent) {
    const LocaleWrapper = (props) => {
        const locale = props.pageContext.locale
        return (
            <IntlProvider locale={locale} messages={messages[locale]}>
                <WrappedComponent {...props} />
            </IntlProvider>
        )
    }
    LocaleWrapper.propTypes = {
        pageContext: PropTypes.shape({
            locale: PropTypes.string.isRequired,
        }),
    }
    return LocaleWrapper
}

export default withLocalization