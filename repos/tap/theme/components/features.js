
export const features = theme => {
  return {
    main: {
    },
    list: {
      main: {
        flex: 1,
      },
      header: {
        ftWt: 'bold',
      },
      item: {
        color: theme?.colors?.palette?.gray01,
      }
    },
  }
}