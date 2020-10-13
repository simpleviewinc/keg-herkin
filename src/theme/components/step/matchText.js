import { tapColors } from '../../tapColors'

export const matchText = {
  main: {
    d: 'flex',
    fl: 1,
    mL: 10,
    flexWrap: 'wrap',
    jtC: 'center',
    alI: 'flex-start',
  },
  text: {
    ftSz: 12,
  },
  parameter: {
    main: {
      c: tapColors.link,
      ftWt: 'bold',
      cursor: 'pointer',
    },
    empty: {
      c: tapColors.danger,
    },
    hover: {
      textDecoration: 'underline',
    },
    touchable: {
      
    },
    text: {
      ftSz: 12,
    },
  }
}