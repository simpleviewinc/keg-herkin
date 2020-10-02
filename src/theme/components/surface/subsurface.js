import { tapColors } from '../../tapColors'
import { kegComponentsTheme as theme } from 'SVTheme/kegComponentsTheme'

const subheaderText = {
  ftSz: 14,
  ftWt: 'bold'
}

export const subsurface = {
  main: {
    mT: theme.margin.size,
    p: theme.padding.size,
    pB: 0,
  },
  headerRow: {
    borderBottomColor: tapColors.border,
    borderBottomWidth: 1,
  },
  header: {
    main: {},
    prefix: {
      ...subheaderText,
      c: tapColors.default
    },
    title: {
      ...subheaderText,
      c: tapColors.success
    }
  },
  drawer: {
    default: {
      main: {}
    },
    sideBar: {
      main: {},
      container: {}
    }
  },
  containerRow: {
    mT: theme.margin.size,
  },
  container: {},
}