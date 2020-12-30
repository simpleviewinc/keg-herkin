import { themeConfig } from './theme.config.js'
import { deepMerge } from '@keg-hub/jsutils'
import { app } from './app'
import { appHeader } from './appHeader'
import { containers } from './containers'
import { transition } from './transition'
import { tapColors } from './tapColors'
import { kegComponentsTheme } from 'SVTheme/kegComponentsTheme'
import { setDefaultTheme } from '@keg-hub/re-theme'
import { components } from './components'
import { screens } from './screens'

const kegTheme = kegComponentsTheme(themeConfig)

export const theme = setDefaultTheme(
  deepMerge(
    kegTheme,
    containers(kegTheme),
    components(kegTheme),
    {
      app: app(theme),
      appHeader: appHeader(kegTheme),
      screens: screens(kegTheme),
      transition: transition(theme),
      tapColors
    },
  )
)

