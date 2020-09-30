import { tapColors } from '../tapColors'
import { kegComponentsTheme as theme } from 'SVTheme/kegComponentsTheme'

export const section = {
  default: {
    $all: {
      backgroundColor: theme?.colors?.palette?.white01,
      shadowColor: tapColors.shadowColor,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      borderWidth: 0,
      p: 0,
      m: 0,
      minH: 200,
    },
  },
}
