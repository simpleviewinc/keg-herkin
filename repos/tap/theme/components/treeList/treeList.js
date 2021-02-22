import { tapColors } from '../../tapColors'

const sharedMainStyle = (theme) => ({
  ...theme.transition([ 'borderBottomColor' ], 0.5),
  borderBottomColor: tapColors.border,
  borderBottomWidth: 1,
  height: 40,
  pL: 8,
  flD: 'row',
  bgC: theme?.colors?.palette?.white01
})

const sharedTextStyle = (isChildNode) => ({
  color: tapColors?.inactive,
  ftWt: 'bold',
  ftSz: isChildNode ? 14 : 17,
  alS: 'center'
})

const iconStyle = (theme) => ({
  position: 'absolute',
  right: 10,
  top: 10,
  size: 16,
  c: theme?.colors?.palette?.gray01
})

const defaultStyles = (theme, isChildNode) => {
  const childDefaultStyle = isChildNode && {
    bgC: tapColors?.accentBackground,
    borderBottomWidth: 0
  }
  return {
    folder: {
      main: {
        ...sharedMainStyle(theme),
        ...childDefaultStyle
      },
      text: sharedTextStyle(isChildNode),
    },
    file: {
      main: {
        ...sharedMainStyle(theme),
        ...childDefaultStyle
      },
      text: sharedTextStyle(isChildNode)
    }
  }
}

const activeStyles = (theme, isChildNode) => {
  return {
    folder: {
      main: sharedMainStyle(theme),
      text: {
        ...sharedTextStyle(isChildNode),
        c: tapColors?.primary,
      }
    },
    file: {
      main: {
        ...sharedMainStyle(theme), 
        bgC: tapColors?.accentBackground,
        borderBottomWidth: 0
      },
      text: {
        ...sharedTextStyle(isChildNode),
        c: tapColors?.success,
      }
    }
  }
}

const hoverStyles = (theme, isChildNode) => {
  const childHoverStyle = isChildNode && {
    bgC: tapColors?.headerBackground,
    borderBottomWidth: 0
  }
  return {
    folder: {
      main: {
        ...sharedMainStyle(theme),
        ...childHoverStyle
      },
      text: {
        ...sharedTextStyle(isChildNode),
        c: tapColors?.primary,
      }
    },
    file: {
      main: {
        ...sharedMainStyle(theme),
        ...childHoverStyle
      },
      text: {
        ...sharedTextStyle(isChildNode),
        c: tapColors?.success,
      }
    }
  }
}

export const treeList = (theme) => ({
  default: {
    root: defaultStyles(theme),
    child: defaultStyles(theme, true),
    icon: iconStyle(theme)
  },
  hover: {
    root: hoverStyles(theme),
    child: hoverStyles(theme, true),
    icon: iconStyle(theme)
  },
  active: {
    root: activeStyles(theme),
    child: activeStyles(theme, true),
    icon: iconStyle(theme)
  }
})