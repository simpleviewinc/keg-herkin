import { tapColors } from '../tapColors'

export const aceThemeOverrides = theme => ({
  '.editors-screen > div:first-child': {
    width: '100%',
  },
  '.ace-chrome': {
    paddingBottom: theme.padding.size
  },
  '.ace-cucumber': {
    color: theme.colors.opacity._100,
    paddingBottom: theme.padding.size
  },
  '.ace-chrome .ace_gutter, .ace-cucumber .ace_gutter': {
    background: tapColors.accentBackground,
    width: '42px !important',
  },
  '.ace_gutter .ace_gutter-layer': {
    width: '42px !important',
  },
  '.ace_gutter .ace_gutter-layer .ace_gutter-active-line': {
      backgroundColor: '#e3e8f0',
  },
  '.gherkin-editor-wrapper': {
    overflowY: 'auto',
    marginRight: '0px !important',
  },
})
