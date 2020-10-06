import React from 'react'
import { Edit, Times } from 'SVAssets'
import {
  Button,
  Icon,
  Text,
} from '@keg-hub/keg-components'

export const StepEditToggle = ({ isEditing, cancelAction, editAction, styles }) => {
  const text = isEditing ? `CANCEL` : `EDIT`
  const onPress = isEditing ? cancelAction : editAction
  const buttonStyles = isEditing ? styles.cancelButton : styles.editButton
  const Element = isEditing ? Times : Edit

  return (
    <Button
      className={`step-edit-action`}
      styles={buttonStyles.main}
      onPress={onPress}
    >
      <Icon
        className={`step-edit-action-icon`}
        styles={buttonStyles.icon}
        Element={Element}
      />
      <Text
        className={`step-edit-action-text`}
        style={buttonStyles.text}
      >
        {text}
      </Text>
    </Button>
  )
}