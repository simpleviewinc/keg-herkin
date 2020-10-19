export const editors = {
  main: {
    flexDirection: 'row',
  },
  feature: {
    width: `100%`,
    height: `75vh`,
  },
  definitions: {
    main: {
      width: `100%`,
      height: `75vh`,
    },
    editor: {
      width: `100%`,
      height: `20vh`,
    }
  },
  testRunner: {
    width: `100%`,
    height: `75vh`,
  },
  split: {
    feature: {
      width: `calc( 50% - 15px )`,
      marginRight: 15,
      height: `75vh`,
    },
    definitions: {
      main: {
        width: `calc( 50% - 15px )`,
        height: `75vh`,
      },
      editor: {
        width: `100%`,
      }
    },
  }
}
