import { tapColors } from '../tapColors'

const shared = theme => {
  return {
    default: {
      main: {
        cursor: 'pointer',
        backgroundColor: 'transparent',
      },
      row: {
        ...theme.flex.justify.between,
        ...theme.flex.align.center,
        pV: theme.padding.size / 1.5,
        pH: theme.padding.size,
      },
      title: {
        ...theme.transition([ 'color' ], 0.5),
        fontWeight: 'bold',
        letterSpacing: 1,
      }
    },
    active: {
      main: {
      },
      title: {
        color: tapColors.primary,
      },
    },
    hover: {
      main: {
      },
      title: {
        color: tapColors.primary,
      },
    }
  }
}

const header = (theme, shared) => {
  return {
    ...shared,
    default: {
      ...shared.default,
      main: {
        ...shared.default.main,
        backgroundColor: tapColors.headerBackground,
        ...theme.transition([ 'borderBottomColor' ], 0.5),
        // Update to tap colors
        borderBottomColor: tapColors.border,
        borderBottomWidth: 1,
      },
      title: {
        ...shared.default.title,
        color: tapColors.inactive,
      },
      toggle: {
        main: {
          color: tapColors.inactive,
        }
      },
    }
  }
}

const item = (theme, shared) => {
  return {
    ...shared,
    default: {
      ...shared.default,
      main: shared.default.main,
      row: {
        ...shared.default.row,
        padding: theme.padding.size,
        pL: theme.padding.size * 2,
      },
      avatar: {},
      icon: {},
      title: {
        ...shared.default.title,
        fontSize: 12,
        color: tapColors.inactive,
      },
      actions: {
        main: {},
        action: {
          main: {},
        }
      }
    }
  }
}

export const list = theme => {
  const sharedStyle = shared(theme)

  return {
    header: header(theme, sharedStyle),
    item: item(theme, sharedStyle)
  }
}