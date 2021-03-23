import { tapColors } from '../../tapColors'

export const renderOutput = theme => {
  return {
    main: {
      w: `100%`,
    },
    default: {
      main: {
        mB: 5,
      },
      text: {
        c: theme.colors.palette.white01,
      }
    },
    cmdRun: {
    
    },
    stdOut: {
    
    },
    stdErr: {
    
    },
    cmdEnd: {
    
    },
    cmdFail: {
    
    },
  }
}