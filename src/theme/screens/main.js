import { tapColors } from '../tapColors'
import { sideBar } from '../components/sideBar'
import { kegComponentsTheme as theme } from 'SVTheme/kegComponentsTheme'

const leftAlign = sideBar.width || 250
export const main = {
  $web: {
    minHeight: 'calc( 100vh - 70px )',
    maxWidth: `calc( 100vw - ${leftAlign}px )`,
    mT: 0,
  },
  $all: {
    position: 'relative',
    top: theme?.padding?.size * 2,
    pH: theme?.padding?.size * 2,
    left: leftAlign,
    backgroundColor: tapColors.appBackground,
  }
}