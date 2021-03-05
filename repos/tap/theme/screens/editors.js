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
      h: `75vh`,
    },
    definitions: {
      main: {
        w: `100%`,
        h: `75vh`,
      },
      editor: {
        w: `100%`,
        minH: `100px`,
      }
    },
    bddSplit: {
      feature: {
        w: `calc( 50% - ${halfMargin}px )`,
        h: `75vh`,
        mR: halfMargin,
      },
      definitions: {
        main: {
          w: `calc( 50% - ${halfMargin}px )`,
          h: `75vh`,
          mL: halfMargin,
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
