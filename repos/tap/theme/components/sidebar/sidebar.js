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
      shadowOpacity: 0.20,
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      bRad: tapColors.borderRadius,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      bgC: tapColors.defaultDark,
      shadowColor: tapColors.shadowColor,
      shadowOffset: { width: 2, height: 2 },
      transitionDuration: '0.8s',
      transitionProperty: 'width height background-color',
    },
    content: {},
    icon: {
      fontSize: 18,
      pos: 'relative',
      left: -1,
      c: theme.colors.palette.white01,
      transitionDuration: '0.8s',
      transitionProperty: 'width height transform stroke color',
    },
    text: {
      
    },
    hover: {
      action: {
        width: 30,
        minH: 75,
        bgC: tapColors.primary,
      },
      icon: {
        fontSize: 25,
        // color: tapColors.success,
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