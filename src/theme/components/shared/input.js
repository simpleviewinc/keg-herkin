import { deepMerge } from '@keg-hub/jsutils'
import { tapColors } from '../../tapColors'
import { kegComponentsTheme as theme } from 'SVTheme/kegComponentsTheme'

const inputWidth = '100%'

export const sharedInput = (styles, width=inputWidth) => deepMerge({
  alignItems: 'center',
  alignSelf: 'flex-start',
  bCR: tapColors.border,
  bgC: tapColors.accentBackground,
  d: 'flex',
  height: 'auto',
  minH: 'auto',
  maxH: 'auto',
  minW: width,
  mR: theme.margin.size / 3,
  pH: theme.padding.size,
  w: width,
  outline: 'none'
}, styles)


export const sharedInputInline = sharedInput()
