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
import { useAltActiveFile } from 'SVHooks/useAltActiveFile'
import { View, TouchableIcon } from '@keg-hub/keg-components'
import { PrefixTitleHeader } from 'SVComponents/labels/prefixTitleHeader'

const { SCREENS, FILE_TYPES } = Values

/**
 * Gets the url of the test report to be loaded
 * @param {string} fileType - Active Test file type
 * @param {string} name - Name of the test file
 *
 * @return {string} - Built report url
 */
const useReportsUrl = (reportFile, { fileType, name }) => useMemo(() => {
  if(!reportFile && !fileType) return

  const loc = reportFile?.ast?.reportUrl
    ? reportFile.ast.reportUrl
    : name
      ? `/reports/${fileType}/${name}`
      : `/reports/${fileType}/${fileType}`

  return `${getBaseApiUrl()}${loc}`
}, [getBaseApiUrl, fileType, name])

/**
 * Callback hook to open the test report in a new window
 * @param {string} fileType - Active Test file type
 * @param {string} reportUrl - Url of the test report
 *
 * @return {void}
 */
const useWindowOpen = reportUrl => useMemo(() => {
  return reportUrl ? () => window?.open(reportUrl, '_blank') : noOp
}, [reportUrl])


/**
 * ResultsScreen Component - Shows test reports and testRun model outputs
 * @param {Object} props
 *
 */
export const ResultsScreen = props => {
  const builtStyles = useStyle(`screens.results`)
  const activeFile = useActiveFile(SCREENS.RESULTS)
  const reportFile = useAltActiveFile(SCREENS.RESULTS, FILE_TYPES.REPORT)

  const reportUrl = useReportsUrl(reportFile, activeFile)
  const onExternalOpen = useWindowOpen(reportUrl)

  return !reportFile && !activeFile?.fileType
    ? (<EmptyScreen message={'No file selected!'} />)
    : (<View
        className={`results-screen`}
        style={builtStyles.main}
      >
        { activeFile?.fileType && (
          <CmdOutput activeFile={activeFile} />
        )}
        { reportUrl && (
          <Results
            {...props}
            reportUrl={reportUrl}
            activeFile={activeFile}
            onExternalOpen={onExternalOpen}
            styles={builtStyles}
          />
        )}
      </View>
  )
}
