import { Values } from 'SVConstants'
import { removeToast } from 'SVActions/toasts'
import { useStyle, useThemeHover, useThemeActive } from '@keg-hub/re-theme'
import { noOpObj, noPropArr, noOp, isStr } from '@keg-hub/jsutils'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { View, Button, Text } from '@keg-hub/keg-components'
import React, { useMemo, useEffect, useCallback } from 'react'
import { Check, Times, Exclamation, Info } from 'SVAssets/icons'
import { isValidComponent } from 'SVUtils/validate/isValidComponent'

const icons = {
  success: Check,
  info: Info,
  danger: Times,
  warn: Exclamation,
}

const { CATEGORIES } = Values

const useIcon = (type, icon) => useMemo(() => {
  const Icon = isStr(type) && icons[type] || icon
  return isValidComponent(Icon) && Icon
}, [type, icon])

const RenderToast = props => {
  const {
    toast=noOpObj,
    onDelete=noOp,
    autoClose=4000,
    styles=noOpObj,
    toastsStyle=noOpObj,
    position='topRight',
  } = props

  const {
    id,
    icon,
    title,
    message,
    type='info',
  } = toast
    
  const toastStyle = useStyle(
    toastsStyle,
    `toast.${type}`,
    styles
  )

  useEffect(() => {
    const timeout = setTimeout(() => {
      onDelete(toast)
      removeToast(toast)
    }, autoClose)

    return () => timeout && clearInterval(timeout)

  }, [autoClose, onDelete, toast])

  const deleteToast = useCallback(() => {
    onDelete(toast)
    removeToast(toast)
  }, [ removeToast, onDelete, toast ])

  const Icon = useIcon(type, icon)

  const [ hoverRef, hoverStyles ] = useThemeHover(toastStyle, toastsStyle.hover)
  const [ ref, themeStyles ] = useThemeActive(hoverStyles, toastsStyle.active, { ref: hoverRef })

  return (
    <View
      ref={ref}
      onClick={deleteToast}
      className={`toast-content toast-${type}`}
      style={themeStyles.content}
    >
      {Icon && (
        <View
          className="toast-left"
          style={themeStyles.left}
        >
          <Icon
            className="toast-icon"
            style={themeStyles.icon}
          />
        </View>
      )}
      <View
        className="toast-right"
        style={themeStyles.right}
      >
        {title && (
          <Text
            className="toast-title"
            style={themeStyles.title}
          >
            { title }
          </Text>
        )}
        {message && (
          <Text
            className="toast-message"
            style={themeStyles.message}
          >
            {message}
          </Text>
        )}
      </View>
    </View>
  )
}

export const Toast = props => {
  const { styles=noOpObj, position='topRight', onDelete=noOp } = props
  
  const { toasts=noPropArr } = useStoreItems([CATEGORIES.TOASTS])

  const toastsStyle = useStyle(
    'toast.default',
    `toast.${position}`,
    styles,
  )

  return (
    <View
      className={'toasts-main'}
      style={toastsStyle.main} 
    >
      {toasts.map(item => (
        <RenderToast
          key={item.key || item.id || `${item.title}-${item.message}`}
          toast={item}
          styles={styles}
          onDelete={onDelete}
          toastsStyle={toastsStyle}
        />
      ))}
    </View>
  )

}