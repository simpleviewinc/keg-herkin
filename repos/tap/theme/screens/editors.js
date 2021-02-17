export const editors = theme => ({
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
      w: `50%`,
      h: `75vh`,
      pR: theme.padding.size / 2,
    },
    definitions: {
      main: {
        w: `50%`,
        h: `75vh`,
        pL: theme.padding.size / 2,
      },
      editor: {
        w: `100%`,
      }
    },
  }
})
