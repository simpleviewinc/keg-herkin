import React, { useMemo } from 'react'
import { noOp } from '@keg-hub/jsutils'
import { getBaseApiUrl } from 'SVUtils/api'
import { Iframe } from 'SVComponents/iframe/iframe'
import { IframeHeader } from 'SVComponents/iframe/iframeHeader'
import { ExternalLink } from 'SVAssets/icons'
import { Surface } from 'SVComponents/surface'
import { useActiveTestRuns } from 'SVHooks/useActiveTestRuns'
import { Loading, View, Text, TouchableIcon } from '@keg-hub/keg-components'
import { PrefixTitleHeader } from 'SVComponents/labels/prefixTitleHeader'
import { ResultsTabs } from './resultsTabs'
import { TestsRunning } from './testsRunning'

/**
 * Results
 * @param {Object} props
 * @param {Object} props.reportUrl - Url of the report being viewed
 * @param {string} props.activeFile - Current activeFile for this screen
 * @param {string} props.onExternalOpen - callback called when the icon is pressed
 * @param {Object} props.styles - Custom styles for the Results component
 * 
 * @returns {Component}
 */
export const Results = props => {
  const {
    reportUrl,
    activeFile,
    onExternalOpen,
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
            onExternalOpen={onExternalOpen}
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