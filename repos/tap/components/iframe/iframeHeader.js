import React from 'react'
import { ExternalLink } from 'SVAssets/icons'
import { Touchable, View, Icon } from '@keg-hub/keg-components'
import { PrefixTitleHeader } from 'SVComponents/labels/prefixTitleHeader'

/**
 * IframeHeader
 * @param {Object} props
 * @param {Object} props.mainTextStyles - passed down from surface component
 * @param {string} props.prefix - prefix passed in to the Surface
 * @param {string} props.title - title passed in to Surface
 * @param {Object} props.titleStyle - titleStyle passed in to Surface
 * @param {Boolean} props.capitalize - capitalize value passed in to Surface
 * 
 * @returns {Component}
 */
export const IframeHeader = (props) => {
  const {
    mainTextStyles,
    prefix,
    title,
    titleStyle,
    capitalize,
    mainStyles,
    onExternalOpen
  } = props

  return (
    <Touchable
      className={'iframe-header-main'}
      onPress={onExternalOpen}
      style={mainStyles?.main}
    >
      <PrefixTitleHeader
        styles={mainTextStyles}
        titleStyle={titleStyle}
        title={title}
        prefix={prefix}
        capitalize={capitalize}
      />
      <Icon
        className={'iframe-header-icon'}
        styles={mainStyles?.icon}
        color={mainStyles?.icon?.color}
        size={mainStyles?.icon?.size}
        Component={ ExternalLink }
      />
    </Touchable>
  )
}