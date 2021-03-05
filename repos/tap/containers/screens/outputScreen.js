import { Values } from 'SVConstants'
import { pickKeys } from '@keg-hub/jsutils'
import { useStyle } from '@keg-hub/re-theme'
import { View } from '@keg-hub/keg-components'
import { AceEditor } from 'SVComponents/aceEditor'
import { useActiveFile } from 'SVHooks/useActiveFile'
import React, { useCallback, useMemo, useState } from 'react'

const { CATEGORIES } = Values

const TestRunner = props => {
  return (
    <AceEditor
      {...props}
      mode='text'
      readOnly={true}
      editorProps={{
        wrapBehavioursEnabled: false,
        animatedScroll: false,
        dragEnabled: false,
        tabSize: 2,
        wrap: true,
      }}
    />
  )
}

export const RunnerScreen = props => {
  const { testsOutcome } = props

  const feature = useActiveFile()
  const builtStyles = useStyle(`screens.editors.runner`)

  if(!feature || !feature.ast) return null

  return (
    <View
      className={`editors-screen`}
      style={theme.get(`screens.editors.main`)}
    >
      <TestRunner
        fileId={feature.location}
        editorId={`runner-editor`}
        value={testsOutcome}
        style={builtStyles}
      />
    </View>
  )
}