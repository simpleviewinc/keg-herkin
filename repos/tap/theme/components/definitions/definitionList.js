import { tapColors } from '../../tapColors'

const listHeader = theme => {
  return {
    default: {
      main: {
        
      },
      row: {
        pV: theme.padding.size / 2,
      },
      title: {
        ftSz: 14,
      }
    },
    active: {
      main: {
      },
      title: {
        
      },
    },
    hover: {
      main: {
      },
      title: {
        
      },
    }
  }
}

const drawer = theme => {
  return {
    main: {
    },
    content: {
      pV: theme.padding.size / 2,
      backgroundColor: tapColors?.accentBackground,
    },
  }
}

const listItem = theme => {
  return {
    default: {
      main: {
        ...theme.transition([ 'backgroundColor' ], 0.8),
      },
      row: {
        pV: theme.padding.size / 2,
        paddingLeft: theme.padding.size,
        
      },
      title: {
      },
      actions: {
        main: {
          ...theme.transition([ 'opacity' ], 0.8),
          opacity: 0,
        },
        action: {
          touchable: {
          },
          name: {
            ftSz: 12,
            ftWt: 'bold',
            c: tapColors?.success,
          }
        }
      }
    },
    hover: {
      main: {
        backgroundColor: tapColors.headerBackground
      },
      actions: {
        main: {
          opacity: 1,
        },
        action: {
          touchable: {},
          name: {}
        }
      }
    }
  }
}

export const definitionList = theme => {
  return {
    list: {
      header: listHeader(theme),
      drawer: drawer(theme),
      item: listItem(theme)
    }
  } 
}