import { tapColors } from '../../tapColors'
import { kegComponentsTheme as theme } from 'SVTheme/kegComponentsTheme'
import { sharedButton, defaultButton } from '../shared'

const getColors = type => {
  return {
    default: tapColors[type],
    hover: tapColors[`${type}Dark`],
    active: tapColors[`${type}Light`],
    disabled: tapColors[`${type}Light`],
  }
}

const buildButton = color => {
  const colors = getColors(color)
  const btnObj = {
    ...defaultButton,
    bRad: tapColors.borderRadius,
    marginLeft: theme.margin.size / 3 
  }
  
  return {
    ...sharedButton(),
    main: {
      default: { main: { ...btnObj, backgroundColor: colors.default }},
      hover: { main: { ...btnObj, backgroundColor: colors.hover }},
      active: { main: { ...btnObj, backgroundColor: colors.active }},
      disabled: { main: { ...btnObj, backgroundColor: colors.disabled }},
    }
  }
}

const table = {
  header: {
    main: {
      
    },
    column0: {
      size: 3
    },
    column1: {
      size: 9
    }
  },
  row: {
    main: {
      mT: theme.margin.size,
    },
    column: {

    },
    column0: {
      size: 3
    },
    column1: {
      size: 9
    }
  }
}

export const editStep = {
  main: {
    p: theme?.padding?.size,
    bW: 1,
    borderTopWidth: 0,
    bC: tapColors.border,
    bRad: tapColors.borderRadius,
  },
  parameters: {
    main: {
      flex: 1,
    },
    label: {
      mT: theme?.margin?.size,
    },
    container: {
    },
    parameter: {
      
    },
    table
  },
  actions: {
    mT: theme?.margin?.size * 2,
    ...theme.flex.right,
    flD: 'row',
  },
  copyAction: buildButton('warn'),
  deleteAction: buildButton('danger'),
  saveAction: buildButton('success'),
}