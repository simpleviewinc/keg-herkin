import { tapColors } from '../../tapColors'
import { toggleState } from './toggleState'

const subheaderText = {
  ftSz: 14,
  ftWt: 'bold'
}

export const subsurface = theme => ({
  main: {
    mT: theme.margin.size,
    p: 0,
  },
  headerRow: {
    fl: 1,
    maxH: 25,
    borderBottomColor: tapColors.border,
    borderBottomWidth: 1,
  },
  header: {
    main: {
      fl: 1,
    },
    prefix: {
      ...subheaderText,
      c: tapColors.default
    },
    title: {
      ...subheaderText,
      c: tapColors.success,
    }
  },
  drawer: {
    default: {
      main: {}
    },
  },
  toggle: toggleState(theme),
  containerRow: {
  },
  container: {},
})