import React from 'react'
import { Values } from 'SVConstants'
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

const { CATEGORIES } = Values

export const RunnerScreen = props => {
  const builtStyles = useStyle(`screens.runner`)
  const parentMethods = useParentMethods()
  const activeFile = useActiveFile(props.id)

  return !activeFile?.fileType
    ? (<EmptyScreen message={'No file selected!'} />)
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
                mainTextStyles={styles}
                mainStyles={builtStyles?.iFrame?.header} 
                /> 
            }
            capitalize={false}
            title={'Report'}
            styles={builtStyles?.iFrame?.wrapper}
            className={`runner-surface-iframe`}
          >
            <Iframe src={'http://localhost:5005/reports/parkin'}/>
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
    mainStyles
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
          Component={ ExternalLink }
        />
    </View>
  )
}