import { kegComponentsTheme as theme } from 'SVTheme/kegComponentsTheme'
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

export const table = {
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