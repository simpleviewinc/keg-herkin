import React, { useCallback } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { checkCall } from '@keg-hub/jsutils'
import { Label, Input, Option, Select, View } from '@keg-hub/keg-components'
import { Parameter } from './parameter'
import { Table } from '../table'

const noPropObj = {}
const dynamicValueType = (value, param, styles=noPropObj, parameterAction) => {
  const type = param?.type || `string`

  switch(type){
    case 'select': {
      return (
        <Select
          key={param.uuid}
          className={`step-param-select`}
          style={styles.select}
          onValueChange={parameterAction}
          value={value}
        >
          {(param.options || []).map(option => {
            return (
              <Option key={`{$param.uuid}-${option}`} key={option} value={option} label={option} />
            )
          })}
        </Select>
      )
    }
    case 'boolean': {
      return (
        <Select
          key={param.uuid}
          className={`step-param-select`}
          style={styles.select}
          onValueChange={parameterAction}
          value={value}
        >
          <Option key={`${param.uuid}-{on}`} value={'true'} label={'On'} />
          <Option key={`${param.uuid}-off`} value={'false'} label={'Off'} />
        </Select>
      )
    }
    case 'string':
    default: {

      if(value[0] === '"') value = value.substring(1, value.length)
      if(value[value.length -1 ] === '"') value = value.substring(0, value.length - 1)

      return (
        <Input
          key={param.uuid}
          className={`step-param-input`}
          style={styles.input}
          onValueChange={parameterAction}
          value={value}
        />
      )
    }
  }
}

const useParameterAction = (param, parameterAction) => {
  return useCallback(value => {
    return checkCall(parameterAction, param, value)
  }, [ param, parameterAction ])
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
 *
*/
const getTableData = (definition, step, styles, parameterAction) => {
  const headerRow = [ 'Token', 'Value' ]

  const rows = Object.entries(step.dynamicMap)
    .reduce((tableData, [ index, value ]) => {
      const defToken = definition.tokens[index]
      if(!defToken || !defToken.params) return tableData

      // Create a new row for the table
      const row = [
        // Add the token value as the first item
        // this is what the user value with match against
        defToken.value,
        // Loop over the params and add the component based on the type for each one
        (<>
          {defToken.params.map(param => {
            const paramAction = useParameterAction(param, parameterAction)
            if(!param) return

            return dynamicValueType(value, param, styles, paramAction)
          })}
        </>)
      ]

      tableData.push(row)

      return tableData
    }, [])

  return { headerRow, rows }
}

export const Parameters = props => {
  const { definition, step, styles, parameterAction } = props
  const theme = useTheme()
  const paramStyles = theme.get('editStep.parameters', styles)

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
        {...getTableData(definition, step, styles, parameterAction)}
      />
    </View>
  )
}
