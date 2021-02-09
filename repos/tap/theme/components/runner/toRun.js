import { tapColors } from '../../tapColors'

export const toRun = theme => ({
  main: {
    p: theme?.padding?.size,
  },
  row: {
    pos: 'relative',
    height: 300,
  },
  editor: {
    pos: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    fontSize: '14px'
  },
  features: {
  }
})