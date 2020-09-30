import { tapColors } from '../tapColors'
import { kegComponentsTheme as theme } from 'SVTheme/kegComponentsTheme'

const titleSize = 14
export const surface = {
  main: {

  },
  header: {
    // Overrides
    itemHeader: {
      main: {
        $web: {
          height: 40,
          borderBottomColor: tapColors.border,
          borderBottomWidth: 1,
        },
      },
      content: {
        left: {
          main: {
            d: 'none',
          }
        },
        center: {
          main: {
            width: '90%',
            alI: 'start',
            pH: theme.padding.size,
          }
        },
        right: {
          main: {
            d: 'none',
          }
        }
      }
    },
    heading: {
      ftWt: 'bold',
      ftSz: titleSize,
    },
    titlePrefix: {
      ftSz: titleSize,
      c: tapColors?.default
    },
    title: {
      ftSz: titleSize,
      c: tapColors?.success
    }
  },
}