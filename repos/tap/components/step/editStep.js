import React from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { Parameters } from '../parameters'
import { SelectDefinition } from '../definition/selectDefinition'
import {
  Button,
  Form,
  Row,
  Text,
  View,
} from '@keg-hub/keg-components'

const EditActions = props => {
  const { copyAction, deleteAction, saveAction, styles } = props

  return (
    <View
      className={`step-edit-actions-main`}
      style={styles?.actions}
    >
      { deleteAction && (
        <Button
          className='step-delete-action'
          styles={styles.deleteAction?.main}
          onPress={deleteAction}
        >
          <Text
            className='step-save-action-text'
            style={styles?.deleteAction?.text}
          >
            Delete
          </Text>
        </Button>
      )}
      { copyAction && (
        <Button
          className='step-copy-action'
          styles={styles.copyAction?.main}
          onPress={copyAction}
        >
          <Text
            className='step-copy-action-text'
            style={styles?.copyAction?.text}
          >
            Copy
          </Text>
        </Button>
      )}
      { saveAction && (
        <Button
          className='step-save-action'
          styles={styles?.saveAction?.main}
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
    </View>
  )
}

export const EditStep = props => {
  const {
    definition,
    highlight,
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
          selectAction={selectAction}
        />
      </Row>
      <Row>
        <Parameters
          step={step}
          highlight={highlight}
          definition={definition}
          className={`step-parameters`}
          parameterAction={parameterAction}
        />
      </Row>
      <Row>
        <EditActions {...props} styles={editStyles} />
      </Row>
    </Form>
  )
}