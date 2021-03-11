import React from "react"
import { useStyle } from '@keg-hub/re-theme'
import { Row } from '@keg-hub/keg-components/row'
import { Icon } from '@keg-hub/keg-components/icon'
import { View } from '@keg-hub/keg-components/view'
import { Text } from '@keg-hub/keg-components/text'
import { wordCaps, noOpObj } from '@keg-hub/jsutils'
import { AnsiUp } from 'SVUtils/runner/ansiUp'

const ansiUp = new AnsiUp
// ansiUp.ansi_to_html

export const RenderOutput = ({ testRunModel, testFile }) => {

  // console.log(`---------- testRunModel ----------`)
  // console.log(testRunModel)

  return (
    <View>
      <Text>
        Render output
      </Text>
    </View>
  )
}
