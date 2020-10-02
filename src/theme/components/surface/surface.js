import { tapColors } from '../../tapColors'
import { kegComponentsTheme as theme } from 'SVTheme/kegComponentsTheme'

const titleSize = 16
export const surface = {
  main: {
    borderTopLeftRadius: tapColors.borderRadius,
    borderTopRightRadius: tapColors.borderRadius,
  },
  header: {
    // Overrides
    itemHeader: {
      main: {
        $web: {
          height: 40,
          borderBottomColor: tapColors.border,
          borderBottomWidth: 1,
          borderTopLeftRadius: tapColors.borderRadius,
          borderTopRightRadius: tapColors.borderRadius,
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