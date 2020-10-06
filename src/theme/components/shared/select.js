import { deepMerge } from '@keg-hub/jsutils'
import { tapColors } from '../../tapColors'
import { kegComponentsTheme as theme } from 'SVTheme/kegComponentsTheme'

const selectWidth = 90

export const sharedSelect = (styles, width=selectWidth) => deepMerge({
  main: {
    bgC: theme.colors.palette.transparent,
    bW: 0,
    height: 'auto',
    minH: 'auto',
    maxH: 'auto',
    w: width,
    minW: width,
  },
  select: {
    $all: {
      alignItems: 'center',
      alignSelf: 'flex-start',
      bCR: tapColors.border,
      bgC: tapColors.accentBackground,
      borderRightWidth: 1,
      d: 'flex',
      height: 'auto',
      minH: 'auto',
      maxH: 'auto',
      minW: width,
      mR: theme.margin.size / 3,
      pH: theme.padding.size,
      w: width,
    }
  },
  icon: {
    container: {
      color: tapColors.default,
      pointerEvents: 'none',
      position: 'absolute',
      right: 10,
      top: 12,
      zIndex: 1,
    },
    icon: {
      color: tapColors.default,
      fontSize: 12,
    }
  },
}, styles)
