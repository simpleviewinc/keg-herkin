import { tapColors } from '../../tapColors'

export const testSelectorModal = theme => ({
  modal: {
    content: {
      $xsmall: {
        minHeight: 200,
        p: 20,
      },
      $medium: {
        minWidth: 550,
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
        flD: 'column', 
        pV: 10
      },
      dropDown: {
        main: {
          fl: 1
        }
      },
    },
    button: {
      main: {
        m: 8,
      }
    }
  }
})
