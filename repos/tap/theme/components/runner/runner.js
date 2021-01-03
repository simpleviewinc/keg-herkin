import { results } from './results'
import { tapColors } from '../../tapColors'

const subsurface = {
  main: {
    fl: 1,
  },
  container: {
    fl: 1,
  },
  
  headerRow: {},
  header: {
    main: {},
    prefix: {},
    title: {}
  },
  drawer: {
    default: {
      main: {}
    },
    sidebar: {
      main: {},
      container: {}
    }
  },
  toggle: {
    main: {},
    icon: {},
    text: {}
  },
  containerRow: {},
}

const toRun = theme => ({
  main: {
    p: theme?.padding?.size,
  },
  features: {
  }
})

const isRunning = theme => ({
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

export const runner = theme => ({
  main: {
    fl: 1,
  },
  row: {
    fl: 1,
  },
  surface: {
    main: {
      fl: 1,
    },
    content: {
      fl: 1,
    }
  },
  subsurface,
  toRun: toRun(theme),
  results: results(theme),
  isRunning: isRunning(theme),
  editor: {
    height: '300px',
    width: '100%',
    fontSize: '14px'
  },
  tabs: {
    main: {
      flexDirection: 'row',
      alignSelf: 'flex-end',
      marginRight: 60,
    },
    actions: {
      save: {
        marginRight: 15
      },
      run: {
      }
    }
  }
})