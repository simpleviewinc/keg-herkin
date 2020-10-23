import { tapColors } from '../../tapColors'
import { kegComponentsTheme as theme } from 'SVTheme/kegComponentsTheme'
import { sharedShadow } from '../shared/shadow'
import { deepMerge } from '@keg-hub/jsutils'

const defTabbar = {
  main: {
    flex: 1,
    flexGrow: 1,
    minHeight: 50,
  },
  fixed: {
    main: {
      position: 'fixed',
      right: 0,
      left: 0,
    },
    top: {
      top: 0,
    },
    bottom: {
      bottom: 0
    }
  },
  container: {
  },
  tabview: {
    flex: 1,
  },
  bar: {
    main: {
      top: 70,
      minHeight: 50,
      cursor: 'pointer',
      flexDirection: 'row',
      bgC: tapColors.headerBackground,
      left: (theme.padding.size * 2) * -1,
      width: `calc( 100% + ${theme.padding.size * 4}px)`,
      backgroundColor: tapColors.headerBackground,
      ...sharedShadow,
      position: 'fixed',
      zIndex: 6,
    },
    bottom: {},
    top: {}
  },
  tab: {
    default: {
      main: {
        flex: 1,
        margin: 0,
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: tapColors.disabledColor,
        bgC: tapColors.accentBackground,
        ...theme.transition([ 'borderBottomColor', 'backgroundColor' ], 0.8),
      },
      text: {
        marginBottom: 0,
        cursor: 'pointer',
        textAlign: 'center',
        color: tapColors.disabledColor,
        ...theme.transition([ 'color' ], 0.8),
      },
      icon: {
        before: {
          
        },
        after: {
          
        },
      }
    },
    hover: {
      main: {
        borderBottomColor: tapColors.link,
        bgC: tapColors.sidebarBackground,
      },
      text: {
        color: tapColors.link,
      },
    },
    active: {
      main: {
        borderBottomColor: tapColors.primary,
        bgC: tapColors.sidebarBackground,
      },
      text: {
        color: tapColors.primary,
      },
    },
  }
}

const editor = deepMerge(defTabbar, {
  main: {
    
  },
  container: {
    
  },
  tabview: {
    
  },
  bar: {
    main: {
      top: 'initial',
      bottom: 0,
      zIndex: 6,
    },
  },
  tab: {
    
  }
})

export const tabbar = {
    editor,
    default: defTabbar,
}