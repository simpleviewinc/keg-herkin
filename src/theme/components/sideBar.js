import { tapColors } from '../tapColors'
import { kegComponentsTheme as theme } from 'SVTheme/kegComponentsTheme'

export const sidebar = {
  main: {
    position: 'fixed',
    left: 250,
    zIndex: 5,
  },
  content: {
    backgroundColor: tapColors.sidebarBackground,
    width: 250,
    minHeight: '100vh',
    pT: 70 + theme.padding.size,
    shadowColor: tapColors.shadowColor,
    shadowOffset: { width: 1, height: 12 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  back: {
    backgroundColor: tapColors.sidebarBackground,
    left: 0,
    minHeight: 'calc(100vh - 70px)',
    position: 'fixed',
    top: -70,
    width: 250,
    height: '100vh',
    zIndex: -1,
  },
  toggle: {
    main: {
      position: 'absolute',
      left: 250,
      top: `40vh`,
      bRad: tapColors.borderRadius,
      bgC: tapColors.sidebarBackground,
      shadowColor: tapColors.shadowColor,
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    action: {
      pH: 1,
      pV: 15,
      position: 'relative',
      left: -1,
    },
    content: {

    },
    icon: {
      fontSize: 18,
      color: tapColors.inactive,
      transitionDuration: '0.8s',
      transitionProperty: 'transform stroke',
    },
    text: {
      
    },
    hover: {
      icon: {
        color: tapColors.primary,
      },
    }
  },
  open: {
    main: {
      left: 0,
    }
  },
  closed: {},
}