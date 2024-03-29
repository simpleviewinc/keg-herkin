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
      backgroundColor: tapColors?.accentBackground,
    },
  }
}

const borderStyle = {
  hide: {
    borderColor: 'transparent',
    top: -1,
    position: 'relative',
    borderWidth: 0,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  show: {
    borderWidth: 0,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: tapColors.border,
    backgroundColor: tapColors.headerBackground,
  }
}


const listItem = theme => {

  const padSizeHalf = theme.padding.size / 2
  const padSizeThird = theme.padding.size / 3

  return {
    default: {
      main: {
        w: '100%',
        flD: 'row',
        alI: 'center',
        flexWrap: 'nowrap',
        ...theme.transition([ 'backgroundColor', 'border' ], 0.8),
        ...theme.flex.justify.between,
        pV: padSizeThird * 2,
        pH: theme.padding.size,
        ...borderStyle.hide,
      },
      row: {
        pV: 0,
        pH: 0,
        pL: 0,
        ...theme.flex.justify.start,
      },
      title: {},
      actions: {
        main: {
          ...theme.transition([ 'opacity' ], 0.8),
          opacity: 0,
          position: 'absolute',
          right: '0',
          pR: theme.padding.size,
        },
        action: {
          main: {
          },
          touchable: {
            flD: 'column',
          },
          icon: {
            icon: {
              c: tapColors?.primary,
              mR: 5,
              paddingLeft: 5
            },
          },
          name: {
            ftSz: 9,
            ftWt: 'bold',
            c: tapColors?.primary,
          }
        }
      },
      touchable: {
        flD: 'row',
        alI: 'center',
        ...theme.flex.justify.start,
        maxWidth: '100%'
      },
      meta: {
        toggle: {
          main: {
            w: 0,
            pos: 'relative',
            overflow: 'visible',
            left: padSizeThird * -1,
            pR: theme.padding.size,
          },
          icon: {
            fontSize: 12,
            color: tapColors.inactive,
            transitionDuration: '0.8s',
            transitionProperty: 'transform',
          }
        },
        drawer: {
          main: {
            bLW: 10,
            bC: tapColors.border,
            bgC: theme?.colors?.palette?.white01,
            pos: 'relative',
            top: -1,
            mB: -1,
          },
          content: {
            p: padSizeThird * 2,
            pB: (padSizeThird * 2) + 2,
            pL: padSizeThird * 4,
          },
          label: {
            ftSz: 12,
            ftWt: 'bold',
            c: tapColors.default,
          },
          description: {
            ftSz: 12,
            pL: theme.padding.size,
            c: tapColors.default,
          },
          expressions: {

          },
          expression: {
            main: {
              mT: theme.margin.size / 3,
            },
            info: {
              ftSz: 12,
              pL: theme.padding.size,
              c: tapColors.default,
            }
          },
        }
      }
    },
    hover: {
      main: {
        ...borderStyle.show,
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
            c: tapColors?.primary,
            bgC: theme?.colors?.palette?.white01,
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
    },
    noMeta: {
      main: {
        pL: theme.padding.size * 2
      }
    },
    activeMeta: {
      main: {
        ...borderStyle.show,
      },
      title: {
        c: tapColors.success,
      },
      meta: {
        toggle: {
          icon: {
            color: tapColors.success,
          }
        },
        drawer: {
          main: {
            borderBottomWidth: 1,
            borderColor: tapColors.border,
          },
        }
      }
    }
  }
}

export const definitionList = theme => {
  return {
    main: {
      fl: 1,
      minW: '100%',
    },
    list: {
      header: listHeader(theme),
      drawer: drawer(theme),
      item: listItem(theme)
    }
  } 
}