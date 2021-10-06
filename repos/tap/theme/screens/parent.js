import { tapColors } from '../tapColors'

export const parent = theme => ({
  main: {
    $web: {
      top: 110,
      height: 'calc( 100vh - 65px )',
      maxWidth: `100vw`,
      transitionDuration: '1s',
      transitionProperty: 'max-width left',
    },
    $all: {
      position: 'relative',
      zIndex: -1,
      pH: theme?.padding?.size,
      backgroundColor: tapColors.appBackground,
      overflow: 'scroll',
    }
  }
})
