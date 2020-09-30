import { kegComponentsTheme as theme } from 'SVTheme/kegComponentsTheme'

export const empty = {
  main: {
    ...theme?.flex?.center,
    flex: 0,
  },
  message: {
    textAlign: 'center',
    w: `100%`,
  }
}