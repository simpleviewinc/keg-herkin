import React, { useEffect, useState } from 'react'
import { useParentMethods } from 'SVHooks'
import { EmptyScreen } from './emptyScreen'
import { useStyle } from '@keg-hub/re-theme'
import { View, TouchableIcon } from '@keg-hub/keg-components'
import { Runner } from 'SVComponents/runner/runner'
import { CmdOutput } from 'SVComponents/cmdOutput/cmdOutput'
import { useActiveFile } from 'SVHooks/useActiveFile'
import { ExternalLink } from 'SVAssets/icons'
import { Surface } from 'SVComponents/surface'
import { Iframe } from 'SVComponents/iframe'
import { PrefixTitleHeader } from 'SVComponents/labels/prefixTitleHeader'
import { getBaseApiUrl } from 'SVUtils/api'
import { apiRequest } from 'SVUtils/api/apiRequest'

// current report URL is static
const reportUrl = `${getBaseApiUrl()}/reports/parkin`

export const RunnerScreen = props => {
  const builtStyles = useStyle(`screens.runner`)
  const parentMethods = useParentMethods()
  const activeFile = useActiveFile(props.id)
  const [showReport, setShowReport] = useState(false)

  /**
   * TODO: this logic should be removed/updated once the runner flow is complete
   * this is here to show that we can load the reporter in the test runner if it exists
   */
  useEffect(() => {
    //  check if there is a report to show
    const checkReport = async () => {
      const result = await apiRequest('/reports/parkin')
      if (result) setShowReport(true)
    }
    checkReport()
  }, [])

  return !showReport
    ? (<EmptyScreen message={'No Report to show'} />)
    : (
        <View
          className={`runner-screen`}
          style={builtStyles.main}
        >
          <Surface
            prefix={'Test Runner'}
            TitleComponent={({styles, ...props}) => 
              <IframeHeader 
                {...props}
                onIconPress={ () => window?.open(reportUrl, '_blank') }
                mainTextStyles={styles}
                mainStyles={builtStyles?.iFrame?.header} 
                /> 
            }
            capitalize={false}
            title={'Report'}
            styles={builtStyles?.iFrame?.wrapper}
            className={`runner-surface-iframe`}
          >
            <Iframe src={reportUrl}/>
          </Surface>
          {/* <CmdOutput
            activeFile={activeFile}
          /> */}
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