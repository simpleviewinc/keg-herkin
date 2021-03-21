import React, { useMemo } from 'react'
import { noOp } from '@keg-hub/jsutils'
import { getBaseApiUrl } from 'SVUtils/api'
import { Iframe } from 'SVComponents/iframe'
import { ExternalLink } from 'SVAssets/icons'
import { Surface } from 'SVComponents/surface'
import { View, TouchableIcon } from '@keg-hub/keg-components'
import { PrefixTitleHeader } from 'SVComponents/labels/prefixTitleHeader'
import { ResultsTabs } from './resultsTabs'

const useReportsUrl = (fileType, name) => useMemo(() => {
  const loc = name ? `${fileType}/${name}` : `${fileType}/${fileType}`
  return `${getBaseApiUrl()}/reports/${loc}`
}, [getBaseApiUrl, fileType, name])

const useWindowOpen = (fileType, reportUrl) => useMemo(() => {
  return fileType ? () => window?.open(reportUrl, '_blank') : noOp
}, [fileType, reportUrl])

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
const IframeHeader = (props) => {
  const {
    mainTextStyles,
    prefix,
    title,
    titleStyle,
    capitalize,
    mainStyles,
    onIconPress
  } = props

  return (
    <View style={mainStyles?.main}>
      <PrefixTitleHeader
        styles={mainTextStyles}
        titleStyle={titleStyle}
        title={title}
        prefix={prefix}
        capitalize={capitalize}
      />
      <TouchableIcon
        styles={mainStyles?.icon}
        color={mainStyles?.icon?.color}
        size={mainStyles?.icon?.size}
        onPress={onIconPress}
        Component={ ExternalLink }
      />
    </View>
  )
}

export const Results = props => {
  const {
    reportUrl,
    activeFile,
    onIconPress,
    builtStyles,
  } = props

  const tabActions = {}

  return (
    <>
      <Surface
        prefix={'Test Results'}
        TitleComponent={({styles, ...props}) => 
          <IframeHeader
            {...props}
            onIconPress={onIconPress}
            mainTextStyles={styles}
            mainStyles={builtStyles?.iFrame?.header} 
          />
        }
        capitalize={false}
        title={'Report'}
        styles={builtStyles?.iFrame?.surface}
        className={`runner-surface-iframe`}
      >
        <Iframe src={reportUrl}/>
      </Surface>
      <ResultsTabs
        styles={builtStyles.actions}
        { ...tabActions }
      />
    </>
  )

}