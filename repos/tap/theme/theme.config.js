import { set, noOpObj } from '@keg-hub/jsutils'
import { shadeHex } from '@keg-hub/re-theme/colors'

export const themeConfig = {
  defaults: noOpObj,
  input: {
    default: {
      borderBottomColor: shadeHex("#999999", 45)
    }
  },
  select: {
    default: {
      main: {
        borderBottomColor: shadeHex("#999999", 45)
      }
    }
  },
}