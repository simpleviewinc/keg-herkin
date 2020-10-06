import { deepMerge } from '@keg-hub/jsutils'
import { tapColors } from '../../tapColors'

const defButton = {
  height: '100%',
  borderTopLeftRadius: '0',
  borderBottomLeftRadius: '0',
  flD: 'row',
  jtC: 'center',
  alI: 'center',
}

const defColors = {
  button: {
    default: tapColors.default,
    hover: tapColors.defaultDark,
    active: tapColors.defaultLight,
    disabled: tapColors.defaultLight
  }
}

export const sharedButton = (customColors={}, styles) => {
  const { button, ...colors } = deepMerge(defColors, customColors)

  return deepMerge({
    main: {
      default: { main: { ...defButton, bgC: button.default }},
      hover: { main: { bgC: button.hover || button.default }},
      active: { main: { bgC: button.active || button.default }},
      disabled: { main: { bgC: button.disabled || button.default }},
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

}