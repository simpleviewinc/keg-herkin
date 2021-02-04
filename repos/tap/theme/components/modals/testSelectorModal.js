import { tapColors } from '../../tapColors'

export const testSelectorModal = theme => ({
  modal: {
    content: {
      $xsmall: {
        minHeight: 200,
      },
      $medium: {
        minWidth: 500,
      }
    },
  },
  itemHeader: {
    main: { maxHeight: 50 },
  },
  form: {
    main: {
      fl: 1
    },
    testFileSelect: {
      main: {
        flD: 'row', 
        pV: 10
      },
      dropDown: {
        main: {
          fl: 1
        }
      },
      orText: {
        alS: 'flex-end', 
        pB: 10
      },
      button: {
        main: {
          mH: 8, 
          alS: 'flex-end'
        }
      }
    }
  }
})
