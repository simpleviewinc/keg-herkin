import { tapColors } from '../../tapColors'

export const isRunning = theme => ({
  main: {},
  container: {
    bgC: 'transparent',
    pos: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    bgC: tapColors.inactive,
    pos: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    op: 0.5,
  },
  progress: {
  
  },
  indicator: {
    icon: {
    }
  },
  text: {
    mT: 35,
    color: theme?.colors?.surface?.primary?.colors?.main,
    ftWt: 'bold',
  },
})
