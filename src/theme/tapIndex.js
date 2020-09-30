import { deepMerge } from '@keg-hub/jsutils'
import { app } from './app'
import { appHeader } from './appHeader'
import { containers } from './containers'
import { transition } from './transition'
import { tapColors } from './tapColors'
import { kegComponentsTheme } from 'SVTheme/kegComponentsTheme'
import * as components from './components'
import * as screens from './screens'

export const theme = deepMerge(
  kegComponentsTheme,
  containers,
  components,
  {
    app,
    appHeader,
    screens,
    transition,
    tapColors
  },
)

