import { tapColors } from '../tapColors'
import { sidebar } from '../components/sidebar'
import { kegComponentsTheme as theme } from 'SVTheme/kegComponentsTheme'

const leftAlign = sidebar.width || 250
export const root = {
  main: {
    $web: {
      mT: 0,
      minHeight: 'calc( 100vh - 70px )',
      maxWidth: `calc( 100vw - ${leftAlign}px )`,
      transitionDuration: '1s',
      transitionProperty: 'max-width left',
    },
    $all: {
      position: 'relative',
      zIndex: -1,
      top: theme?.padding?.size * 2,
      pH: theme?.padding?.size * 2,
      left: leftAlign,
      backgroundColor: tapColors.appBackground,
    }
  },
  closed: {
    maxWidth: `100vw`,
    left: 0,
  }
}