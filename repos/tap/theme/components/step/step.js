import { tapColors } from '../../tapColors'
import { sharedButton } from '../shared'
import { matchText } from './matchText'

export const step = theme => ({
  main: {
    mT: theme.margin.size,
    pB: 0,
  },
  container: {
    p: 0,
    bW: 1,
    bRad: tapColors.borderRadius,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    bC: tapColors.border,
    minH: tapColors.inputHeight,
    maxH: tapColors.inputHeight,
    bgC: tapColors.backGround,
    overflow: 'hidden',
    flexDirection: `row`
  },
  matchText: matchText(theme),
  editButton: sharedButton(theme, {
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
  cancelButton: sharedButton(theme, {
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
})