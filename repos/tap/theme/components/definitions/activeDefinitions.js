import { tapColors } from '../../tapColors'

export const activeDefinitions = theme => {
  const padDouble = theme.padding.size * 2

  return {
    editor: {},
    none: {
      main: {
        width: '100%',
        jC: 'center',
        alI: 'center',
        mT: theme.margin.size,
        pH: theme.padding.size,
      },
      text: {
        textAlign: 'center',
        color: tapColors.defaultLight,
        bgC: tapColors.backGround,
        width: '100%',
        pV: padDouble,
        pH: theme.padding.size,
      }
    }
  }
}