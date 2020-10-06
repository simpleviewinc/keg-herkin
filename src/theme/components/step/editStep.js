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
const borderRadius = {
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
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
      flex: 1,
    },
    label: {
      mT: theme?.margin?.size,
    },
    container: {
    },
    parameter: {
      
    }
  },
  actions: {
    mT: theme?.margin?.size,
    ...theme.flex.right,
  },
  saveAction: {
    ...sharedButton(),
    main: {
      default: { main: { bRad: tapColors.borderRadius, backgroundColor: tapColors.success }},
      hover: { main: { bRad: tapColors.borderRadius, backgroundColor: tapColors.successDark }},
      active: { main: { bRad: tapColors.borderRadius, backgroundColor: tapColors.successLight }},
      disabled: { main: { bRad: tapColors.borderRadius, backgroundColor: tapColors.successLight }},
    }
  }
}