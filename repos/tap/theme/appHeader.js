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
        height: 50,
      },
    },
    left: {
      main: {
        p: theme.padding.size,
      },
      content: {
        title: {
          c: tapColors.default,
          ftWt: 'bold',
        }
      }
    },
    right: {
      default: {
        main: {
          mR: 20,
        },
        touch: {
          opacity: 0.5,
          ...theme.transition([ 'opacity' ], 0.8),
        },
        container: {
          alI: 'center',
        },
        icon: {
          ftSz: 20,
          c: tapColors.borderColor,
          mB: 3,
        },
        text: {
          ftSz: 10,
          c: tapColors.borderColor,
        }
      },
      hover: {
        touch: {
          opacity: 1,
        },
      }
      
    }
  }
}