import { tapColors } from '../../tapColors'
import { kegComponentsTheme as theme } from 'SVTheme/kegComponentsTheme'

const subheaderText = {
  ftSz: 14,
  ftWt: 'bold'
}

const toggleState  = {
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
      c: tapColors.success,
    }
  },
  drawer: {
    default: {
      main: {}
    },
  },
  toggle: toggleState,
  containerRow: {
    mT: theme.margin.size,
  },
  container: {},
}