import { tapColors } from '../tapColors'

export const section = theme => ({
  default: {
    $all: {
      backgroundColor: theme?.colors?.palette?.white01,
      shadowColor: tapColors.shadowColor,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      bW: 0,
      bRad: 3,
      p: 0,
      m: 0,
      minH: 200,
    },
  },
})
