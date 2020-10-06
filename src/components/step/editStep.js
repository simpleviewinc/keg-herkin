import React from 'react'
import { Values } from 'SVConstants'
import { pickKeys } from '@keg-hub/jsutils'
import { useTheme } from '@keg-hub/re-theme'
import { useSelector, shallowEqual } from 'react-redux'
import { Option, Select, Text, View, Label, Form, Button } from '@keg-hub/keg-components'
const { CATEGORIES } = Values

const SelectStep = props => {
  const { styles, step, selectAction } = props
  const { steps } = useSelector(({ items }) => pickKeys(
    items,
    [ CATEGORIES.STEPS ]
  ), shallowEqual)

  const stepsFromType = step.type && steps[ step.altType || step.type]

  return (
    <>
      <Label
        className={`step-edit-select-label`}
        style={styles.label}
      >
        Step Definition
      </Label>
      <Select
        className='select-step-main'
        styles={styles}
        value={step.definition}
        onValueChange={selectAction}
      >
        {stepsFromType && stepsFromType.map(parsed => {
          const { name, uuid } = parsed
          return (
            <Option
              key={uuid}
              value={uuid}
              label={name}
            />
          )
        })}
      </Select>
    </>
  )

}

const EditActions = props => {
  const { copyAction, deleteAction, saveAction, styles } = props

  return (
    <View
      className={`step-edit-actions`}
    >
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
    </View>
  )
}

const Parameters = props => {
  const { styles } = props
  return (
    <>
      <Label
        className={`step-edit-parameters-label`}
        style={styles?.label}
      >
        Parameters
      </Label>
      <View
        className={`step-edit-parameters-main`}
        style={styles?.main}
      >
        <Text>
          All Parameters here
        </Text>
      </View>
    </>
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
      <SelectStep
        step={step}
        className={`step-select`}
        styles={editStyles.selectStep}
        selectAction={selectAction}
      />
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