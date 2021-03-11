import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { Values } from 'SVConstants'
import { noOp } from '@keg-hub/jsutils'
import { getBaseApiUrl } from 'SVUtils/api'
import { EmptyScreen } from './emptyScreen'
import { Iframe } from 'SVComponents/iframe'
import { useStyle } from '@keg-hub/re-theme'
import { ExternalLink } from 'SVAssets/icons'
import { Surface } from 'SVComponents/surface'
import { CmdOutput } from 'SVComponents/cmdOutput'
import { Results } from 'SVComponents/results'
import { apiRequest } from 'SVUtils/api/apiRequest'
import { useActiveFile } from 'SVHooks/useActiveFile'
import { View, TouchableIcon } from '@keg-hub/keg-components'
import { PrefixTitleHeader } from 'SVComponents/labels/prefixTitleHeader'

const { SCREENS } = Values

/**
 * Gets the url of the test report to be loaded
 * @param {string} fileType - Active Test file type
 * @param {string} name - Name of the test file
 *
 * @return {string} - Built report url
 */
const useReportsUrl = (fileType, name) => useMemo(() => {
  const loc = name ? `${fileType}/${name}` : `${fileType}/${fileType}`

  return `${getBaseApiUrl()}/reports/${loc}`
}, [getBaseApiUrl, fileType, name])

/**
 * Callback hook to open the test report in a new window
 * @param {string} fileType - Active Test file type
 * @param {string} reportUrl - Url of the test report
 *
 * @return {void}
 */
const useWindowOpen = (fileType, reportUrl) => useMemo(() => {
  return fileType ? () => window?.open(reportUrl, '_blank') : noOp
}, [fileType, reportUrl])


/**
 * ResultsScreen Component - Shows test reports and testRun model outputs
 * @param {Object} props
 *
 */
export const ResultsScreen = props => {
  const builtStyles = useStyle(`screens.results`)
  const activeFile = useActiveFile(SCREENS.RESULTS)

  const { fileType, name } = activeFile
  const reportUrl = useReportsUrl(fileType, name)
  const onIconPress = useWindowOpen(fileType, reportUrl)

  const [ testRunning, setTestRunning ] = useState(false)

  return !activeFile?.fileType
    ? (<EmptyScreen message={'No file selected!'} />)
    : (<View
        className={`results-screen`}
        style={builtStyles.main}
      >
        <CmdOutput
          activeFile={activeFile}
          setTestRunning={setTestRunning}
        />
        <Results
          {...props}
          testRunning={testRunning}
          reportUrl={reportUrl}
          activeFile={activeFile}
          onIconPress={onIconPress}
          builtStyles={builtStyles}
        />
      </View>
  )
}
