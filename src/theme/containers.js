import { tapColors } from './tapColors'

export const containers = {
  containers: {
    root: {
      main: {
        height: '100%',
        minHeight: 'calc( 100vh - 70px )',
        margin: 0,
        borderWidth: 0,
      },
      screen: {
        position: 'relative',
        top: 30,
        left: 250,
        backgroundColor: tapColors.appBackground,
        minHeight: 'calc( 100vh - 70px )',
        maxWidth: 'calc( 100vw - 200px )',
      }
    }
  }
}