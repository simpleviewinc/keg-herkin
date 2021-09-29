import { tapColors } from '../tapColors'

export const results = theme => {
  return {
    main: {
      flexDirection: 'column',
      width: `100%`,
      height: '100%'
    },
    iFrame: {
      surface: {
        main: {
          fl:1, 
        }, 
        content: {
          fl:1,
        }
      },
      header: {
        main: {
          flD: 'row', 
          alI: 'center'
        },
        icon: {
          container: {
            pL: 8
          },
          color: tapColors.primary, 
          size: 18
        }
      }
      
    },
    running: {
      main: {
        width: `100%`,
        alI: 'center',
        jtC: 'center',
        minH: 200,
      },
      loading: {
        color: tapColors.defaultLight,
      },
      text: {
        mT: theme.margin.size * 2,
        color: tapColors.defaultLight,
        ftWt: 'bold',
      },
    }
  }
}
