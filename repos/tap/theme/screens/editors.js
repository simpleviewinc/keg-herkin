import { tapColors } from '../tapColors'

export const editors = theme => {
  const halfMargin = theme.margin.size / 2

  return {
    main: {
      flD: 'row',
    },
    surface: {
      main: {
        fl:1
      },
      content: {
        flWr: 'nowrap', 
        backgroundColor: tapColors.backGround
      }
    },
    full: {
      w: `100%`,
      h: `75vh`,
    },
    feature: {
      w: `100%`,
      h: `calc( 100vh - 210px )`,
    },
    definitions: {
      main: {
        w: `100%`,
        h: `calc( 100vh - 170px )`,
        overflowY: 'auto',
      },
      editor: {
        w: `100%`,
        minH: `100px`,
      }
    },
    bddSplit: {
      feature: {
        w: `calc( 50% - ${halfMargin}px )`,
        h: `calc( 100vh - 210px )`,
        mR: halfMargin,
      },
      definitions: {
        main: {
          w: `calc( 50% - ${halfMargin}px )`,
          h: `calc( 100vh - 170px )`,
          mL: halfMargin,
          overflowY: 'auto',
        },
        editor: {
          w: `100%`,
          minH: `100px`,
        }
      },
    },
    actions: {
      default: {
        main: {
          flD: 'row',
          alS: 'flex-end',
          mR: theme.margin.size,
        },
      },
      showRun: {
        save: { mR: 15 },
      }
    }
  }
}
