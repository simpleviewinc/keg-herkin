import { tapColors } from '../../tapColors'

export const reload = theme => ({
  default: {
    main: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      opacity: 0.5,
      ...theme.transition([ 'opacity' ], 0.8),
    },
    icon: {
      fontSize: 16,
      marginRight: 5,
      color: tapColors.successLight,
    },
    text: {
      ftWt: 'bold',
      fontSize: 11,
      color: tapColors.successLight,
    }
  },
  hover: {
    main: {
      opacity: 1,
    },
  }
})