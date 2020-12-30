import { tapColors } from './tapColors'
import { sharedShadow } from './components/shared/shadow'

export const appHeader = theme => {
  return {
    main: {
      $all: {
        zIndex: 6,
        width: '100%',
        position: 'fixed',
        ...sharedShadow,
        backgroundColor: tapColors.headerBackground,
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
}