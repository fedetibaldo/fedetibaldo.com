import CMS from 'netlify-cms-app'
import AboutPreview from './previews/AboutPreview'

import '../styles/global.css'

window.CMS_ENV = process.env.GATSBY_CMS_ENV

CMS.registerPreviewTemplate(`about`, AboutPreview)

CMS.init()
