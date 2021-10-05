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
        flD: 'row',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: tapColors.disabledColor,
        bgC: tapColors.accentBackground,
        ...theme.transition([ 'borderBottomColor', 'backgroundColor' ], 0.8),
      },
      container: {
        opacity: 0.8,
        flD: 'row',
        ...theme.transition([ 'opacity' ], 0.8),
      },
      text: {
        marginBottom: 0,
        cursor: 'pointer',
        textAlign: 'center',
        color: tapColors.disabledColor,
        minWidth: 'unset',
      },
      icon: {
        before: {
          color: tapColors.disabledColor,
          fontSize: 16,
          mR: 8,
        },
        after: {
          color: tapColors.disabledColor,
          fontSize: 16,
          mL: 8,
        },
      }
    },
    hover: {
      main: {
        borderBottomColor: tapColors.link,
        bgC: tapColors.sidebarBackground,
      },
      container: {
        opacity: 1,
      },
      text: {
        color: tapColors.link,
      },
      icon: {
        before: {
          color: tapColors.link,
        },
        after: {
          color: tapColors.link,
        },
      }
    },
    active: {
      main: {
        borderBottomColor: tapColors.primary,
        bgC: tapColors.sidebarBackground,
      },
      container: {
        opacity: 1,
      },
      text: {
        color: tapColors.primary,
      },
      icon: {
        before: {
          color: tapColors.primary,
        },
        after: {
          color: tapColors.primary,
        },
      }
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