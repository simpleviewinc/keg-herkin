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
        h: `20vh`,
      }
    },
    split: {
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
        }
      },
    }
  }
}
