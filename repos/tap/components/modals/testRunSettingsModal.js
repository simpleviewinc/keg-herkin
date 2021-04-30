import React, { useCallback, useState, useMemo } from 'react'
import { Values } from 'SVConstants'
import { addToast } from 'SVActions/toasts/addToast'
import { Input } from 'SVComponents/form/input'
import { Select } from 'SVComponents/form/select'
import { useStyle } from '@keg-hub/re-theme'
import { useCloseModal } from 'SVHooks/useCloseModal'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { setModalVisibility } from 'SVActions/modals/setModalVisibility'
import { setRunSettings } from 'SVActions/settings/setRunSettings'
import { isNum, noOpObj, exists } from '@keg-hub/jsutils'
import {
  Modal,
  Button,
  Row,
  Column,
  ItemHeader,
  View,
  Text
} from '@keg-hub/keg-components'

const { CATEGORIES, BROWSER_TYPES } = Values
const browserTypes = Object.entries(BROWSER_TYPES).map(([label, value]) => ({label, value}))

const useSettings = () => {
  const { runSettings=noOpObj } = useStoreItems([CATEGORIES.RUN_SETTINGS])
  const [ settings, setSettings ] = useState(runSettings)

  const updateSettings = useCallback((key, value, type='number') => {
    if(!exists(value)) return

    let val = value
    if(type === 'number' && value !== ''){
      val = parseInt(value)
      if((isNaN(val) || !isNum(val)))
        return console.error('Input must be a number')
    }

    settings[key] !== val &&
      setSettings({ ...settings, [key]: val })
  }, [settings])

  const setBrowser = useCallback(
    browser => updateSettings('browser', event.target.value, 'string'),
    [settings.browser]
  )

  const setHeight = useCallback(
    event => updateSettings('height', event.target.value),
    [settings.height]
  )

  const setWidth = useCallback(
    event => updateSettings('width', event.target.value),
    [settings.width]
  )

  const setSpeed = useCallback(
    event => updateSettings('speed', event.target.value),
    [settings.speed]
  )

  const setTestTimeout = useCallback(
    event => updateSettings('timeout', event.target.value),
    [settings.timeout]
  )

  const onSaveSettings = useCallback(() => {
    setModalVisibility(false)
    setRunSettings(runSettings)
  }, [settings])

  return {
    settings,
    setBrowser,
    setHeight,
    setSpeed,
    setTestTimeout,
    setWidth,
    onSaveSettings
  }
}

const Dimensions = props => {
  const {
    settings,
    setHeight,
    setWidth
  } = props

  return (
    <Row>
      <Column>
        <Input
          title={'Browser Width (px)'}
          onChange={setWidth}
          type={`number`}
          value={settings.width}
        />
      </Column>
      <Column>
        <Input
          title={'Browser Height (px)'}
          onChange={setHeight}
          type={`number`}
          value={settings.height}
        />
      </Column>
    </Row>
  )
}

/**
 * Modal Component to modify active settings of the Application
 * @param {Object} props
 * @returns
 */
export const TestRunSettingsModal = props => {
  const {
    title = 'Test Run Settings',
    visible=false
  } = props

  const onBackdropTouch = useCloseModal()
  const builtStyles = useStyle(`modals.testRunSettings`)
  const {
    settings,
    setBrowser,
    setHeight,
    setSpeed,
    setTestTimeout,
    setWidth,
    onSaveSettings
  } = useSettings()

  return (
    <Modal
      visible={visible}
      styles={builtStyles?.modal}
      onBackdropTouch={onBackdropTouch}
    >
      <ItemHeader
        title={title}
        styles={builtStyles?.itemHeader}
      />
      <View style={builtStyles?.form?.main}>
        <Select
          title={'Browser Type'}
          onValueChange={setBrowser}
          value={settings.browser}
          options={browserTypes}
        />
        <Input
          title={'Test Timeout (sec)'}
          onChange={setTestTimeout}
          type={`number`}
          value={settings.timeout}
        />
        <Input
          title={'Test Speed (sec)'}
          onChange={setSpeed}
          type={`number`}
          value={settings.speed}
        />
        <Dimensions
          settings={settings}
          setHeight={setHeight}
          setWidth={setWidth}
        />
        <Button
          themePath='button.contained.primary'
          styles={builtStyles?.form?.button}
          content={(
            <Text style={builtStyles?.form?.buttonText} >
              Save
            </Text>
          )}
          onPress={onSaveSettings}
        />
      </View>
    </Modal>
  )
}
