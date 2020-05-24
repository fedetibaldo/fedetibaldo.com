import React from 'react'

import { createCss } from "@stitches/css"
import { Provider, config } from "../../styles/css"

function withStyles(WrappedComponent) {
    const StylesWrapper = (props) => {
        const css = createCss(config)
        return (
            <Provider css={css}>
                <WrappedComponent {...props} />
            </Provider>
        )
    }
    return StylesWrapper
}

export default withStyles
