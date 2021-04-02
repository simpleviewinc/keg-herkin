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
        w: '100%',
        flD: 'row',
        alI: 'center',
        ...theme.transition([ 'backgroundColor' ], 0.8),
        ...theme.flex.justify.between,
        pV: theme.padding.size / 2,
        pH: theme.padding.size,
        // paddingLeft: theme.padding.size,
      },
      row: {
        pV: 0,
        pH: 0,
        pL: 0,
        ...theme.flex.justify.start,
        flexWrap: 'nowrap',
      },
      title: {},
      actions: {
        main: {
          ...theme.transition([ 'opacity' ], 0.8),
          opacity: 0,
        },
        action: {
          main: {
          },
          touchable: {
            flD: 'row',
          },
          icon: {
            icon: {
              c: tapColors.inactive,
              mR: 5,
            },
          },
          name: {
            ftSz: 12,
            ftWt: 'bold',
            c: tapColors.inactive,
          }
        }
      },
      touchable: {
        flD: 'row',
        alI: 'center',
        ...theme.flex.justify.start,
      },
      meta: {
        main: {

        },
        toggle: {
          main: {
            pR: theme.padding.size / 3,
          },
          icon: {
            fontSize: 12,
            color: tapColors.inactive,
            transitionDuration: '0.8s',
            transitionProperty: 'transform',
          }
        }
      }
    },
    hover: {
      main: {
        backgroundColor: tapColors.headerBackground
      },
      title: {
        c: tapColors.success,
      },
      actions: {
        main: {
          opacity: 1,
        },
        action: {
          touchable: {
            c: tapColors?.success,
          },
          name: {
            c: tapColors?.success,
          }
        }
      },
      meta: {
        toggle: {
          icon: {
            color: tapColors.success,
          }
        }
      }
    }
  }
}

export const definitionList = theme => {
  return {
    main: {
      minW: '100%',
    },
    list: {
      header: listHeader(theme),
      drawer: drawer(theme),
      item: listItem(theme)
    }
  } 
}