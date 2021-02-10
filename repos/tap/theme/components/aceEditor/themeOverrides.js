import { tapColors } from '../../tapColors'

export const aceThemeOverrides = theme => ({
  'ace-chrome': {
    paddingBottom: theme.padding.size * 2
  },
  'ace-chrome .ace_gutter': {
    paddingTop: theme.padding.size,
    background: tapColors.accentBackground,
  },
  'ace-chrome  .ace_scroller': {
    paddingTop: theme.padding.size,
  }
})
