import { tapColors } from '../../tapColors'

const listHeader = theme => {
  return {
    default: {
      main: {
        
      },
      row: {
        pV: theme.padding.size / 2,
      },
      title: {
        ftSz: 14,
      }
    },
    active: {
      main: {
      },
      title: {
        
      },
    },
    hover: {
      main: {
      },
      title: {
        
      },
    }
  }
}

const drawer = theme => {
  return {
    main: {
    }
  }
}

const listItem = theme => {
  return {
  }
}

export const definitionList = theme => {
  return {
    main: {},
    list: {
      header: listHeader(theme),
      drawer: drawer(theme),
      item: listItem(theme)
    }
  } 
}