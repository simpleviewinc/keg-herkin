import { tapColors } from '../../tapColors'
import { kegComponentsTheme as theme } from 'SVTheme/kegComponentsTheme'
import { sharedSelect } from '../shared'

export const selectDefinition = sharedSelect({
  main: {
    bW: 0,
    bgC: theme.colors.palette.transparent,
    height: 'auto',
    minH: 'auto',
    maxH: 'auto',
    w: `100%`,
    borderRadius: tapColors.borderRadius,
  },
  select: {
    $all: {
      d: 'flex',
      alignItems: 'center',
      alignSelf: 'flex-start',
      pH: theme.padding.size,
      mR: theme.margin.size / 3,
      bW: 1,
      bC: tapColors.border,
      bgC: tapColors.accentBackground,
      borderRadius: tapColors.borderRadius,
      ftSz: 12,
      ftWt: 'normal',
      height: 'auto',
      minH: 'auto',
      maxH: 'auto',
      w: `100%`,
    }
  },
  icon: {
    container: {
      color: tapColors.default,
      position: 'absolute',
      zIndex: 1,
      right: 10,
      top: 12,
      pointerEvents: 'none',
    },
    icon: {
      color: tapColors.default,
      fontSize: 12,
    }
  },
})