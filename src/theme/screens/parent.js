import { tapColors } from '../tapColors'

export const parent = theme => ({
  main: {
    $web: {
      mT: 110,
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
  }
})