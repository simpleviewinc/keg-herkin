import { tapColors } from '../tapColors'
import { kegComponentsTheme as theme } from 'SVTheme/kegComponentsTheme'

export const parent = {
  main: {
    $web: {
      mT: 0,
      minHeight: 'calc( 100vh - 70px )',
      maxWidth: `100vw`,
      transitionDuration: '1s',
      transitionProperty: 'max-width left',
    },
    $all: {
      position: 'relative',
      zIndex: -1,
      top: theme?.padding?.size * 2,
      pH: theme?.padding?.size * 2,
      backgroundColor: tapColors.appBackground,
    }
  },
  closed: {
    maxWidth: `100vw`,
    left: 0,
  }
}