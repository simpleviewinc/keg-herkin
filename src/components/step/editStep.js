import React from 'react'
import { Values } from 'SVConstants'
import { useTheme } from '@keg-hub/re-theme'
import { Parameters } from './parameters'
import { SelectDefinition } from '../definition/selectDefinition'

import {
  Button,
  Form,
  Label,
  Row,
  Text,
} from '@keg-hub/keg-components'

const { CATEGORIES } = Values

const EditActions = props => {
  const { copyAction, deleteAction, saveAction, styles } = props

  return (
    <Row
      className={`step-edit-actions-main`}
      style={styles?.actions}
    >
      { saveAction && (
        <Button
          className='step-save-action'
          styles={styles?.saveAction.main}
          onPress={saveAction}
        >
          <Text
            className='step-save-action-text'
            style={styles?.saveAction?.text}
          >
            Save
          </Text>
        </Button>
      )}
      { copyAction && (
        <Button
          className='step-copy-action'
          styles={styles.copyAction}
          onPress={copyAction}
        >
          Copy to Clipboard
        </Button>
      )}
      { deleteAction && (
        <Button
          className='step-delete-action'
          styles={styles.deleteAction}
          onPress={deleteAction}
        >
          Delete
        </Button>
      )}
    </Row>
  )
}

export const EditStep = props => {
  const {
    parameterAction,
    selectAction,
    step,
    styles
  } = props

  const theme = useTheme()
  const editStyles = theme.get('editStep', styles)

  return (
    <Form
      className={`step-edit-main`}
      style={editStyles.main}
    >
      <Row>
        <SelectDefinition
          step={step}
          className={`step-select`}
          styles={editStyles.selectStep}
          selectAction={selectAction}
        />
      </Row>
      <Parameters
        step={step}
        className={`step-parameters`}
        styles={editStyles.parameters}
        parameterAction={parameterAction}
      />
      <EditActions {...props} styles={editStyles} />
    </Form>
  )
}