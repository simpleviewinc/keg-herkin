import React, { useMemo } from 'react'
import { noOp } from '@keg-hub/jsutils'
import { getBaseApiUrl } from 'SVUtils/api'
import { Iframe } from 'SVComponents/iframe'
import { ExternalLink } from 'SVAssets/icons'
import { Surface } from 'SVComponents/surface'
import { useActiveTestRuns } from 'SVHooks/useActiveTestRuns'
import { Loading, View, Text, TouchableIcon } from '@keg-hub/keg-components'
import { PrefixTitleHeader } from 'SVComponents/labels/prefixTitleHeader'
import { ResultsTabs } from './resultsTabs'

const TestsRunning = ({ styles }) => {
  return (
    <View
      style={styles?.main}
      className={`tests-running-main`}
    >
      <Loading
        style={styles?.loading}
        size={styles?.loading?.size || 'large'}
        color={styles?.loading?.color}
      />
      <Text
        style={styles?.text}
        className={`tests-running-text`}
      >
        Tests Running
      </Text>
    </View>
  )
}

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
    styles,
  } = props

  const testRunModel = useActiveTestRuns()

  return (
    <>
      <Surface
        prefix={'Test Results'}
        TitleComponent={({styles:textStyles, ...props}) => 
          <IframeHeader
            {...props}
            onIconPress={onIconPress}
            mainTextStyles={textStyles}
            mainStyles={styles?.iFrame?.header} 
          />
        }
        capitalize={false}
        title={'Report'}
        styles={styles?.iFrame?.surface}
        className={`runner-surface-iframe`}
      >
        {
          testRunModel?.running
            ? (<TestsRunning styles={styles?.running} />)
            : (<Iframe src={reportUrl}/>)
        }
      </Surface>
      <ResultsTabs styles={styles?.actions} />
    </>
  )

}