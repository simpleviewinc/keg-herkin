import { tapColors } from '../tapColors'
import { deepMerge } from '@keg-hub/jsutils'

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
  return deepMerge(shared, {
    default: {
      main: {
        backgroundColor: tapColors.headerBackground,
        borderTopColor: tapColors.border,
        borderTopWidth: 1,
      },
      title: {
        color: tapColors.inactive,
      },
      toggle: {
        main: {
          color: tapColors.inactive,
        }
      },
      first: {
        main: {
          borderTopWidth: 0,
        }
      }
    },
    active: {
      main: {
        borderBottomColor: tapColors.border,
        borderBottomWidth: 1,
      }
    }
  })
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
        main: {
          d: 'flex',
          flD: 'row',
        },
        action: {
          main: {
            mL: theme.margin.size,
          },
        }
      }
    }
  }
}

export const list = theme => {
  const sharedStyle = shared(theme)

  return {
    main: {
      flex: 'unset',
      display: 'unset',
    },
    drawer: {
      content: {
        backgroundColor: theme?.tapColors?.backGround,
      },
    },
    header: header(theme, sharedStyle),
    item: item(theme, sharedStyle)
  }
}