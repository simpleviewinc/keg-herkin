import { tapColors } from '../../tapColors'

const subheaderText = {
  ftSz: 14,
  ftWt: 'bold'
}

const toggleState = theme => ({
  default: {
    main: {},
    icon: {
      fontSize: 10,
      color: tapColors.success,
    },
    text: {
      ftSz: 12,
      c: tapColors.success,
    }
  },
  open: {
    icon: {
      color: tapColors.danger,
    },
    text: {
      color: tapColors.danger,
    }
  },
  closed: {
    icon: {
      
    },
    text: {
      
    }
  },
})

export const subsurface = theme => ({
  main: {
    mT: theme.margin.size,
    p: theme.padding.size,
    pB: 0,
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