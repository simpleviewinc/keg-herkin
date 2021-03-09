import React from "react"
import { useStyle } from '@keg-hub/re-theme'
import { Row } from '@keg-hub/keg-components/row'
import { Icon } from '@keg-hub/keg-components/icon'
import { View } from '@keg-hub/keg-components/view'
import { Text } from '@keg-hub/keg-components/text'
import { wordCaps, noOpObj } from '@keg-hub/jsutils'
import { CheckFilled, TimesFilled } from 'SVAssets/icons'


export const RenderOutput = ({ output, testFile }) => {

  // console.log(`---------- output ----------`)
  // console.log(output)

  // console.log(`---------- testFile ----------`)
  // console.log(testFile)

  return (
    <View>
      <Text>
        Render output
      </Text>
    </View>
  )
}
