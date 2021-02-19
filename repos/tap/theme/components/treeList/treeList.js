import { tapColors } from '../../tapColors'

const sharedMainStyle = (theme, isHover) => ({
  ...theme.transition([ 'borderBottomColor' ], 0.5),
  borderBottomColor: tapColors.border,
  borderBottomWidth: 1,
  pL: 10,
  pB: 5,
  flD: 'row',
  bgC: isHover ? tapColors.defaultLight : tapColors.headerBackground
})

const sharedTextStyle = (theme, isHover) => ({
  color: isHover ? theme.colors.palette.white01 : tapColors.inactive,
  fontWeight: 'bold',
  fontSize: 17,
  pT: 10
})

const iconStyle = (theme, isHover) => ({
  position: 'absolute',
  right: 10,
  top: 10,
  size: 16,
  c: isHover ? theme.colors.palette.white01 : tapColors.default
})

export const treeList = (theme) => ({
  default: {
    header: {
      main: sharedMainStyle(theme),
      text: sharedTextStyle(theme),
    },
    item: {
      main: {
        ...sharedMainStyle(theme),
        borderBottomWidth: 0
      },
      text: {
        ...sharedTextStyle(theme),
        fontSize: 14,
      }
    },
    icon: iconStyle(theme)
  },
  hover: {
    header: {
      main: sharedMainStyle(theme, true),
      text: sharedTextStyle(theme, true),
    },
    item: {
      main: {
        ...sharedMainStyle(theme, true),
        borderBottomWidth: 0,
      },
      text: {
        ...sharedTextStyle(theme, true),
        fontSize: 14,
      }
    },
    icon: iconStyle(theme, true)
  },
})