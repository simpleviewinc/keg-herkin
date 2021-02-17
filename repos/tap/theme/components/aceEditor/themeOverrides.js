import { tapColors } from '../../tapColors'

export const aceThemeOverrides = theme => ({
  'ace-chrome': {
    paddingBottom: theme.padding.size
  },
  'ace-chrome .ace_gutter': {
    background: tapColors.accentBackground,
  },
})
