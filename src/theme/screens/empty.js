
export const empty = theme => ({
  main: {
    ...theme?.flex?.center,
    flex: 0,
  },
  message: {
    textAlign: 'center',
    w: `100%`,
  }
})