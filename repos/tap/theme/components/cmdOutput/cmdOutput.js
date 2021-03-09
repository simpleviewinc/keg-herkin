import { renderOutput } from './renderOutput'

export const cmdOutput = theme => {
  return {
    main: {
    },
    surface: {
      main: {
        mB: theme.margin.size * 2,
      },
    },
    renderOutput,
  }
}