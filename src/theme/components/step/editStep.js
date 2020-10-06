import { tapColors } from '../../tapColors'
import { deepMerge } from '@keg-hub/jsutils'
import { kegComponentsTheme as theme } from 'SVTheme/kegComponentsTheme'
import { sharedButton } from '../shared'


const selectStyles = {
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
}


export const editStep = {
  main: {
    p: theme?.padding?.size,
    bW: 1,
    borderTopWidth: 0,
    bC: tapColors.border,
    bRad: tapColors.borderRadius,
  },
  selectStep: deepMerge(selectStyles, {
    label: {},
  }),
  parameters: {
    main: {
    },
    label: {
      mT: theme?.margin?.size,
    },
    parameter: {
      
    }
  },
  saveAction: sharedButton({
    button: {
      default: tapColors.success,
      hover: tapColors.successDark,
      active: tapColors.successLight,
      disabled: tapColors.successLight
    }
  })
}