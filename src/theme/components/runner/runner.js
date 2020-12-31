import { results } from './results'

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
  },
  subsurface,
  toRun: toRun(theme),
  results: results(theme),
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