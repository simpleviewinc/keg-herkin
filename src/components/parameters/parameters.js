import React, { useCallback, useMemo } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { Label, View } from '@keg-hub/keg-components'
import { Parameter } from './parameter'
import { noOpObj, noOpArr } from 'SVUtils/helpers/noop'
import { Table } from '../table'

const headerRow = [ 'Token', 'Value' ]


/**
 * Maps the definition tokens to the values in the step
 * @example
 *    Not Editable      Editable - Based on type ( string || number || select || boolean )
 * __________________________________
 * |     Token      |     Value     |
 * |----------------|---------------|
 * |   "([^"]*)?"   |    keg-hub    |
 * |----------------|---------------|
 * |    ( not)*     |     empty     |
 * ----------------------------------
 * 
 * @returns {Array} - Array of arrays, containing row items for the Table component
*/
const getTableRows = (tokens=noOpArr, dynamicMap=noOpObj, highlight) => {
  return Object.entries(dynamicMap)
    .reduce((tableRows, [ index, value ]) => {
      const token = tokens[index]

      return !token || !token.params
        ? tableRows
        // Create a new row for the table
        : tableRows.push({
            ...token,
            // Add the token value as the first item
            // this is what the user value with match against
            token: token.value,
            highlight: highlight === token.uuid,
            // Add the params as the second value
            // This is what the current value is mapped to for this story
            params: token.params,
            value: value,
            ids: [ token.uuid ],
          }) && tableRows

    }, [])
}

const renderParameter = (row, props) => {
  const {
    ids,
    index,
    rowProps,
    ...attrs
  } = props
  
  const rowId = ids[index]
  return (
    <Parameter
      key={rowId}
      {...attrs}
      {...rowProps}
      row={row}
    />
  )
}

export const Parameters = props => {
  const {
    definition,
    highlight,
    label,
    parameterAction,
    step,
    styles,
  } = props

  const theme = useTheme()
  const paramStyles = theme.get('editStep.parameters', styles)

  const tableRows = getTableRows(
    definition.tokens,
    step.dynamicMap,
    highlight
  )

  return (
    <View
      className={`step-edit-parameters-main`}
      style={paramStyles?.main}
    >
      <Label
        className={`step-edit-parameters-label`}
        style={paramStyles?.label}
      >
        { label || `Parameters`}
      </Label>
      <Table
        className={`step-edit-parameters-table`}
        styles={paramStyles?.table}
        headerRow={headerRow}
        renderRow={renderParameter}
        rows={tableRows}
        parameterStyles={paramStyles?.dynamic}
        parameterAction={parameterAction}
      />
    </View>
  )
}
