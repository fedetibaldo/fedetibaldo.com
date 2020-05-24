import React from 'react'
import PropTypes from 'prop-types'

import { LocaleContext } from '../../contexts/locale'

function withLocalization(WrappedComponent) {
    const LocaleWrapper = (props) => {
        const locale = props.pageContext.locale
        return (
            <LocaleContext.Provider value={locale}>
                <WrappedComponent {...props} />
            </LocaleContext.Provider>
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