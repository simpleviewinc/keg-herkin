import { tapColors } from '../../tapColors'
import { deepMerge } from '@keg-hub/jsutils'
import { sharedShadow } from '../shared/shadow'

export const codeTabs = (theme, defTabbar) => deepMerge(defTabbar, {
  main: {
  },
  container: {
    
  },
  tabview: {
    display: 'none',
  },
  bar: {
    main: {
      top: 'initial',
      minHeight: 45,
      bgC: tapColors.headerBackground,
      left: (theme.padding.size * 2) * -1,
      width: `calc( 100% + ${theme.padding.size * 4}px)`,
      ...sharedShadow,
      bottom: 0,
      position: 'fixed',
      zIndex: 6,
    },
  },
  tab: {
    
  }
})