import React, { useMemo } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { Label, Row, Text, View } from '@keg-hub/keg-components'
import { Parameter } from './parameter'
import { Table } from '../table'

const useTableData = (definition, step) => {
  return  useMemo(() => {
    Object.entries(step.dynamicMap).reduce((tableData, [ index, value ]) => {
      const defToken = definition.tokens[index]
      // TODO: map the definition tokens to the values in the step
      /*
            Not Editable      Editable - Based on type ( string || number || select || boolean )
        __________________________________
        |     Token      |     Value     |
        |----------------|---------------|
        |   "([^"]*)?"   |    keg-hub    |
        |----------------|---------------|
        |    ( not)*     |     empty     |
        ----------------------------------
      */
      return tableData
    }, {})
    
  }, [definition, step])
}

export const Parameters = props => {
  const { definition, step, styles } = props
  const theme = useTheme()
  const paramStyles = theme.get('editStep.parameters', styles)
  
  // useTableData(definition, step)

  return (
    <>
      <Label
        className={`step-edit-parameters-label`}
        style={paramStyles?.label}
      >
        Parameters
      </Label>
      <View
        className={`step-edit-parameters-main`}
        style={paramStyles?.container}
      >
        <Table
        
        />
      </View>
    </>
  )
}
