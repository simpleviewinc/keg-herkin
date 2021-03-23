import { tapColors } from '../../tapColors'
import { deepMerge } from '@keg-hub/jsutils'
import { codeTabs } from './codeTabs'
import { screenTabs } from './screenTabs'
import { definitionTabs } from './definitionTabs'
import { resultsTabs } from './resultsTabs'

const defTabbar = theme => ({
  main: {},
  fixed: {
    main: {
      position: 'fixed',
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
      cursor: 'pointer',
      flexDirection: 'row',
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
})

export const tabbar = theme => {
  const builtTabbar = defTabbar(theme)
  return {
    default: builtTabbar,
    code: codeTabs(theme, builtTabbar),
    screens: screenTabs(theme, builtTabbar),
    results: resultsTabs(theme, builtTabbar),
    definitions: definitionTabs(theme, builtTabbar),
    
  }
}