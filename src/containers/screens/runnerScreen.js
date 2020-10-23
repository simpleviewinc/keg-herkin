import { Values } from 'SVConstants'
import React, { useCallback, useMemo, useState } from 'react'
import { pickKeys } from '@keg-hub/jsutils'
import { useTheme } from '@keg-hub/re-theme'
import { View } from '@keg-hub/keg-components'
import { AceEditor } from 'SVComponents/aceEditor'
import { useSelector, shallowEqual } from 'react-redux'

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
  const theme = useTheme()
  const {
    testsOutcome
  } = props

  const { activeData, features } = useSelector(({ items }) => pickKeys(
    items,
    [ CATEGORIES.ACTIVE_DATA, CATEGORIES.FEATURES, CATEGORIES.DEFINITIONS ]
  ), shallowEqual)

  const feature = features && features[activeData?.feature]
  if(!feature) return null

  const builtStyles = theme.get(`screens.editors.runner`)

  return (
    <View
      className={`editors-screen`}
      style={theme.get(`screens.editors.main`)}
    >
      <TestRunner
        editorId={`runner-editor`}
        value={testsOutcome}
        style={builtStyles}
      />
    </View>
  )
}