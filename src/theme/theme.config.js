import { set } from '@keg-hub/jsutils'
import { tapColors } from './tapColors'
import { kegComponentsTheme as theme } from 'SVTheme/kegComponentsTheme'


set(theme, `form.input.default.borderBottomColor`, theme.colors.palette.gray01)
set(theme, `form.select.default.main.borderBottomColor`, theme.colors.palette.gray01)