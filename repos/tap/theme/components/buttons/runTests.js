import { tapColors } from '../../tapColors'

export const runTests = theme => ({
  main: {},
  button: {
    default: {
      main: {
        flD: 'row',
        alI: 'center',
        jtC: 'center',
        pL: theme.padding.size,
        pR: theme.padding.size,
      }
    }
  },
  icon: {
    color: theme.colors.palette.white01,
    mR: 10,
    ftSz: 20,
  },
  text: {
    color: theme.colors.palette.white01,
  },
})