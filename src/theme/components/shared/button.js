import { deepMerge } from '@keg-hub/jsutils'
import { tapColors } from '../../tapColors'

export const defaultButton = {
  height: '100%',
  padding: 10,
  flD: 'row',
  jtC: 'center',
  alI: 'center',
}

const sideButton = {
  right: {
    bRad: tapColors.borderRadius,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  left: {
    bRad: tapColors.borderRadius,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  }
}


const defColors = {
  button: {
    default: tapColors.default,
    hover: tapColors.defaultDark,
    active: tapColors.defaultLight,
    disabled: tapColors.defaultLight
  }
}

export const sharedButton = (theme, styles={}) => {
  const { side, colors:customColors, ...customStyles } = styles
  const buttonFrom = { ...defaultButton, ...(sideButton[side] || {}) }
  const { button, ...colors } = deepMerge(defColors, customColors)

  return deepMerge({
    main: {
      default: { main: { ...buttonFrom, bgC: button.default }},
      hover: { main: { ...buttonFrom, bgC: button.hover || button.default }},
      active: { main: { ...buttonFrom, bgC: button.active || button.default }},
      disabled: { main: { ...buttonFrom, bgC: button.disabled || button.default }},
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
  }, customStyles)

}