import { tapColors } from '../../tapColors'
import { sidebarContent } from './sideBarContent'
export const sidebar = theme => ({
  main: {
    zIndex: 5,
    left: 250,
    position: 'fixed',
  },
  container: {
    width: 250,
    shadowRadius: 6,
    minHeight: '100vh',
    shadowOpacity: 0.05,
    pT: 50,
    shadowColor: tapColors.shadowColor,
    shadowOffset: { width: 1, height: 12 },
    backgroundColor: tapColors.sidebarBackground,
  },
  back: {
    left: 0,
    top: -70,
    zIndex: -1,
    width: 250,
    height: '100vh',
    position: 'fixed',
    minHeight: 'calc(100vh - 70px)',
    backgroundColor: tapColors.sidebarBackground,
  },
  toggle: {
    main: {
      position: 'absolute',
    },
    action: {
      pH: 1,
      pV: 15,
      left: 250,
      width: 20,
      minH: 50,
      top: `45vh`,
      shadowRadius: 2,
      shadowOpacity: 0.05,
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      bRad: tapColors.borderRadius,
      bgC: tapColors.sidebarBackground,
      shadowColor: tapColors.shadowColor,
      shadowOffset: { width: 2, height: 2 },
    },
    content: {},
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
  content: sidebarContent(theme)
})