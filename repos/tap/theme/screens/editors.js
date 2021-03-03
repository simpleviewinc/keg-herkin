export const editors = theme => {
  const halfMargin = theme.margin.size / 2

  return {
    main: {
      flD: 'row',
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
      feature: {
        save: { mR: 15 },
      }
    }
  }
}
