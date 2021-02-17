import { tapColors } from '../../tapColors'

export const sidebarContent = (theme) => ({
  testFiles: {
    main: {
      flD: 'row',
      bgC: tapColors.defaultDark,
      minH: 60
    },
    textContainer: {
      fl:1, 
      jtC: 'center', 
      pL: 8
    },
    text: {
      ftWt: 'bold',
      ftSz: 20,
      c: theme.colors.palette.white01
    },
    iconContainer: {
      fl: 1, 
      alI: 'flex-end', 
      pR: 5,
      jtC: 'center'
    },
    icon: {
      size: 30,
      fill: theme.colors.palette.white01,
      opacity: 0.2,
      stroke: tapColors.disabledColor
    }
  }
})