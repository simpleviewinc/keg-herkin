import React, { useCallback, useMemo } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { checkCall } from '@keg-hub/jsutils'
import { Label, Input, Option, Select, View } from '@keg-hub/keg-components'
import { noOpObj, noOpArr } from 'SVUtils/helpers/noop'
import { removeQuotes } from 'SVUtils/helpers/removeQuotes'
import { Table } from '../table'

const headerRow = [ 'Token', 'Value' ]

const useParameterAction = (param, parameterAction) => {
  return useCallback(value => {
    return checkCall(parameterAction, param, value)
  }, [ param, parameterAction ])
}

const DynamicInput = props => {
  const {
    param,
    parameterAction,
    styles,
    value,
  } = props

  const {
    options=noOpArr,
    type=`string`,
    uuid,
  } = param

  const paramAction = useParameterAction(param, parameterAction)

  switch(type){
    case 'select': {
      return (
        <Select
          key={uuid}
          className={`step-param-select`}
          style={styles?.select}
          onValueChange={paramAction}
          value={value}
        >
          {options.map(option => {
            return (
              <Option
                key={option}
                value={option}
                label={option}
              />
            )
          })}
        </Select>
      )
    }
    case 'boolean': {
      return (
        <Select
          key={uuid}
          className={`step-param-select`}
          style={styles?.select}
          onValueChange={paramAction}
          value={value}
        >
          <Option key={`${uuid}-{on}`} value={'true'} label={'On'} />
          <Option key={`${uuid}-off`} value={'false'} label={'Off'} />
        </Select>
      )
    }
    case 'string':
    default: {
      return (
        <Input
          key={uuid}
          className={`step-param-input`}
          style={styles?.input}
          onValueChange={paramAction}
          value={removeQuotes(value)}
        />
      )
    }
  }
}

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
const useTableRows = (tokens=noOpArr, dynamicMap=noOpObj, styles=noOpObj, parameterAction) => {
  return useMemo(() => {
    return Object.entries(dynamicMap)
      .reduce((tableRows, [ index, value ]) => {
        const defToken = tokens[index]

        return !defToken || !defToken.params
          ? tableRows
          // Create a new row for the table
          : tableRows.push([
              // Add the token value as the first item
              // this is what the user value with match against
              defToken.value,
              // Loop over the params and add the component based on the type for each one
              defToken.params.map(param => {
                return param && (
                  <DynamicInput
                    key={param.uuid}
                    value={value}
                    param={param}
                    styles={styles}
                    parameterAction={parameterAction}
                  />
                )
              })
            ]) && tableRows
      }, [])
  }, [tokens, dynamicMap, styles, parameterAction])
}

export const Parameters = props => {
  const { definition, step, styles, parameterAction } = props
  const theme = useTheme()
  const paramStyles = theme.get('editStep.parameters', styles)
  const tableRows = useTableRows(
    definition.tokens,
    step.dynamicMap,
    paramStyles?.dynamic,
    parameterAction
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
        Parameters
      </Label>
      <Table
        className={`step-edit-parameters-table`}
        styles={paramStyles?.table}
        headerRow={headerRow}
        rows={tableRows}
      />
    </View>
  )
}
