import { tapColors } from '../../tapColors'

const sharedMainStyle = theme => ({
  backgroundColor: tapColors.headerBackground,
  ...theme.transition([ 'borderBottomColor' ], 0.5),
  borderBottomColor: tapColors.border,
  borderBottomWidth: 1,
  mL: 10,
  flD: 'row'
})

const sharedTextStyle = {
  color: tapColors.inactive,
  fontWeight: 'bold',
  fontSize: 22,
  pT: 10
}

export const treeList = (theme) => ({
  header: {
    main: sharedMainStyle(theme),
    text: sharedTextStyle,
  },
  item: {
    main: {
      ...sharedMainStyle(theme),
      borderBottomWidth: 0

    },
    text: {
      ...sharedTextStyle,
      fontSize: 17
    }
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 10,
    size: 16,
    color: tapColors.default
  }
})