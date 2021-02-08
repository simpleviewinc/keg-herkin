import { tapColors } from './tapColors'
import { sharedShadow } from './components/shared/shadow'

const buttonStyle = {
}

export const appHeader = theme => {
  return {
    main: {
      $all: {
        zIndex: 6,
        width: '100%',
        position: 'fixed',
        ...sharedShadow,
        backgroundColor: tapColors.headerBackground,
        height: 50,
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
    right: {
      main: {
        mR: 20,
      },
      button: buttonStyle,
      icon: {
        ftSz: 18,
        color: tapColors.default,
      },
    }
  }
}