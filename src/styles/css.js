import { createStyled } from "@stitches/styled"
import { createConfig } from "@stitches/tailwind"

const config = createConfig({})

const { Provider, useCss, styled } = createStyled()

export { config, Provider, useCss, styled }
