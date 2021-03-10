import { tapColors } from '../../tapColors'

export const createFile = theme => ({
  modal: {
    content: {
      $xsmall: {
        minHeight: 200,
        p: theme.padding.size,
        pT: 0,
      },
      $medium: {
        minWidth: 550,
      }
    },
  },
  itemHeader: {
    main: {
      maxHeight: 50,
      left: theme.padding.size * -1,
      backgroundColor: tapColors.defaultDark,
      width: `calc( 100% + ${theme.padding.size * 2}px )`,
    },
    content: {
      center: {
        content: {
          title: {
            color: tapColors.textColorAlt, 
          }
        }
      }
    }
  },
  form: {
    main: {
      fl: 1,
      mT: theme.margin.size,
    },
    name: {
    },
    button: {
      main: {
        m: 8,
        mT: theme.margin.size
      }
    },
    buttonText: {
      ftWt: 'bold',
      c: tapColors.textColorAlt,
      txAl: 'center', 
    }
  }
})
