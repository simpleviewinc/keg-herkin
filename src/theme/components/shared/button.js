import { deepMerge } from '@keg-hub/jsutils'
import { tapColors } from '../../tapColors'

export const sharedButton = (colors={}, styles) => deepMerge({
  button: {
    main: {
      height: '100%',
      borderTopLeftRadius: '0',
      borderBottomLeftRadius: '0',
      bgC: colors.button,
      flD: 'row',
      jtC: 'center',
      alI: 'center',
    }
  },
  icon: {
    container: {
      mR: 5,
    },
    icon: {
      fontSize: 12,
      c: colors.icon || colors.text || tapColors.buttonText,
    }
  },
  text: {
    ftSz: 14,
    ftWt: 'bold',
    c: colors.text || tapColors.buttonText,
  }
}, styles)