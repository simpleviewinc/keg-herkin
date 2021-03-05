import { Values } from 'SVConstants'
import { removeToast } from 'SVActions/toasts'
import { useStyle } from '@keg-hub/re-theme'
import { noOpObj, noPropArr, noOp } from '@keg-hub/jsutils'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { View, Button, Text } from '@keg-hub/keg-components'
import React, { useState, useEffect, useRef, useCallback } from 'react'

const { CATEGORIES } = Values

const RenderToast = props => {
  const {
    toast=noOpObj,
    onDelete=noOp,
    autoClose=3500,
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

  return (
    <View
      onClick={deleteToast}
      className="toast-content"
      style={toastStyle.content}
    >
    {title && (
      <Text
        className="toast-title"
        style={toastStyle.title}
      >
        { title }
      </Text>
    )}
    {message && (
      <Text
        className="toast-message"
        style={toastStyle.message}
      >
        {message}
      </Text>
    )}
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