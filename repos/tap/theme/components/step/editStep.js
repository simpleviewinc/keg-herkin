import { parameters } from '../parameters'
import { tapColors } from '../../tapColors'
import { sharedButton, defaultButton } from '../shared'

const getColors = type => {
  return {
    default: tapColors[type],
    hover: tapColors[`${type}Dark`],
    active: tapColors[`${type}Light`],
    disabled: tapColors[`${type}Light`],
  }
}

const buildButton = (theme, color) => {
  const colors = getColors(color)
  const btnObj = {
    ...defaultButton,
    bRad: tapColors.borderRadius,
    marginLeft: theme.margin.size / 3 
  }
  
  return {
    ...sharedButton(theme),
    main: {
      default: { main: { ...btnObj, backgroundColor: colors.default }},
      hover: { main: { ...btnObj, backgroundColor: colors.hover }},
      active: { main: { ...btnObj, backgroundColor: colors.active }},
      disabled: { main: { ...btnObj, backgroundColor: colors.disabled }},
    }
  }
}



export const editStep = theme => ({
  main: {
    p: theme?.padding?.size,
    bW: 1,
    borderTopWidth: 0,
    bC: tapColors.border,
    bRad: tapColors.borderRadius,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  parameters,
  actions: {
    mT: theme?.margin?.size * 2,
    ...theme.flex.right,
    flD: 'row',
  },
  copyAction: buildButton(theme, 'warn'),
  deleteAction: buildButton(theme, 'danger'),
  saveAction: buildButton(theme, 'success'),
})