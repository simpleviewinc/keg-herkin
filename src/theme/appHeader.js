import { tapColors } from './tapColors'
import { kegComponentsTheme as theme } from 'SVTheme/kegComponentsTheme'

export const appHeader = {
  main: {
    $all: {
      backgroundColor: tapColors.headerBackground,
      shadowColor: tapColors.shadowColor,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
    },
  },
  side: {},
  center: {},
  left: {
    main: {
      padding: theme.padding.size,
    },
    content: {
      title: {
        color: tapColors.default,
        fontWeight: 'bold',
      }
    }
  },
}