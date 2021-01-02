import { tapColors } from '../tapColors'

export const drawer = theme => ({
  default: {
    main: {
      overflow: 'hidden',
      width: "100%"
    }
  },
  sidebar: {
    main: {},
    container: {
      backgroundColor: tapColors.accentBackground,
      paddingTop: 7.5,
      paddingBottom: 7.5,
      borderBottomColor: tapColors.border,
      borderBottomWidth: 1,
    }
  }
})