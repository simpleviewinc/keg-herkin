import { tapColors } from './tapColors'
import { get } from '@keg-hub/jsutils'

export const app = theme => ({
  main: {
    width: '100%',
    overflow: 'hidden',
    maxWidth: '100%',
    maxH: `calc( 100vh - 45px )`,
    backgroundColor: tapColors.appBackground,
  }
})
