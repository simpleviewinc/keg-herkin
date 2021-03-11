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
import { useActiveTestFile } from 'SVHooks/useActiveTestFile'
import React, { useEffect, useState, useMemo } from 'react'
import { View, TouchableIcon } from '@keg-hub/keg-components'
import { PrefixTitleHeader } from 'SVComponents/labels/prefixTitleHeader'

const useReportsUrl = (fileType, name) => useMemo(() => {
  const loc = name ? `${fileType}/${name}` : `${fileType}/${fileType}`
  return `${getBaseApiUrl()}/reports/${loc}`
}, [getBaseApiUrl, fileType, name])

const useWindowOpen = (fileType, reportUrl) => useMemo(() => {
  return fileType ? () => window?.open(reportUrl, '_blank') : noOp
}, [fileType, reportUrl])

export const ResultsScreen = props => {
  const builtStyles = useStyle(`screens.results`)
  const activeTestFile = useActiveTestFile(props.id)

  const { fileType, name } = activeTestFile

  const reportUrl = useReportsUrl(fileType, name)
  const onIconPress = useWindowOpen(fileType, reportUrl)

  return !activeTestFile?.fileType
    ? (<EmptyScreen message={'No file selected!'} />)
    : (<View
        className={`results-screen`}
        style={builtStyles.main}
      >
        <CmdOutput activeTestFile={activeTestFile} />
        <Results
          {...props}
          reportUrl={reportUrl}
          activeTestFile={activeTestFile}
          onIconPress={onIconPress}
          builtStyles={builtStyles}
        />
      </View>
  )
}
