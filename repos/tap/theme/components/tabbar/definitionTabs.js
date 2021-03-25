import { tapColors } from '../../tapColors'
import { deepMerge } from '@keg-hub/jsutils'

export const definitionTabs = (theme, defTabbar) => deepMerge(defTabbar, {
  main: {
    zIndex: 7,
    bgC: tapColors.headerBackground,
    mB: theme.margin.size * 2,
    minW: '100%',
  },
  tabview: {
    display: 'none',
  },
  bar: {
    main: {
      width: '100%',
      position: 'absolute',
      minHeight: theme.margin.size * 2,
      bgC: tapColors.headerBackground,
    },
  },
  tab: {
    
  }
})

