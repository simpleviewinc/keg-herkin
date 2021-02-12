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
      c: tapColors.white
    },
    iconContainer: {
      fl: 1, 
      alI: 'flex-end', 
      pR: 5,
      jtC: 'center'
    },
    icon: {
      size: 30,
      fill: tapColors.white,
      opacity: 0.2,
      stroke: tapColors.disabledColor
    }
  }
})