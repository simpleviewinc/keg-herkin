import { tapColors } from '../../tapColors'
import { kegComponentsTheme as theme } from 'SVTheme/kegComponentsTheme'
import { sharedButton } from '../shared'
import { matchText } from './matchText'

export const step = {
  main: {
    mT: theme.margin.size * 2,
    pB: 0,
  },
  container: {
    p: 0,
    bW: 1,
    bRad: 3,
    minH: tapColors.inputHeight,
    maxH: tapColors.inputHeight,
    bC: tapColors.border,
    bgC: tapColors.backGround,
    overflow: 'hidden',
    flexDirection: `row`
  },
  matchText,
  editButton: sharedButton({
    side: 'right',
    colors: {
      button: {
        default: tapColors.link,
        hover: tapColors.linkDark,
        active: tapColors.linkLight,
        disabled: tapColors.linkLight
      }
    }
  }),
  cancelButton: sharedButton({
    side: 'right',
    colors: {
      button: {
        default: tapColors.danger,
        hover: tapColors.dangerDark,
        active: tapColors.dangerLight,
        disabled: tapColors.dangerLight
      }
    }
  }),
}