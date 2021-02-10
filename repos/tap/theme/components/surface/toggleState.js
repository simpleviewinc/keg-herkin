import { tapColors } from '../../tapColors'


export const toggleState = theme => ({
  default: {
    main: {
      flD: 'row',
      alI: 'baseline',
    },
    icon: {
      fontSize: 10,
      color: tapColors.success,
    },
    text: {
      ftSz: 12,
      ftWt: 'bold',
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