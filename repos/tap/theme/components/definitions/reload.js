import { tapColors } from '../../tapColors'

export const reload = theme => ({
  default: {
    main: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    icon: {
      fontSize: 16,
      marginRight: 5,
      color: tapColors.inactive,
    },
    text: {
      ftWt: 'bold',
      fontSize: 11,
      color: tapColors.defaultDark,
    }
  },
  hover: {
    icon: {
      color: tapColors.link,
    },
    text: {
      color: tapColors.linkDark,
    }
  }
})