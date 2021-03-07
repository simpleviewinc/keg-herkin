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
          minH: 600
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
      
    }
  }
}
