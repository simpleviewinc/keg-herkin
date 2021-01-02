import { tapColors } from '../../tapColors'

const rowStyles = {
  main: {
    alI: 'center',
  },
  column: {

  },
  text: {
    ftSz: 14,
  }
}

export const table = theme => {
  return {
    main: {
      
    },
    header: {
      ...rowStyles,
    },
    row: {
      ...rowStyles,
      main: {
        ...rowStyles.main,
        mT: theme.margin.size,
      }
    }
  } 
}