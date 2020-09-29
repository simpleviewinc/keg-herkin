import { tapColors } from '../tapColors'
import { kegComponentsTheme as theme } from 'SVTheme/kegComponentsTheme'

export const sideBar = {
  main: {
    position: 'fixed',
    backgroundColor: tapColors.sidebarBackground,
    top: '70px',
    left: 0,
    zIndex: 1,
    width: 250,
    minHeight: 'calc( 100vh - 70px )',
    pT: theme.padding.size,
    shadowColor: tapColors.shadowColor,
    shadowOffset: { width: 1, height: 12 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  }
}