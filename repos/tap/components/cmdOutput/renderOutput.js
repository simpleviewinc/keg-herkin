import React, { useMemo, useRef, useEffect } from "react"
import { useStyle } from '@keg-hub/re-theme'
import { Row } from '@keg-hub/keg-components/row'
import { Icon } from '@keg-hub/keg-components/icon'
import { View } from '@keg-hub/keg-components/view'
import { Text } from '@keg-hub/keg-components/text'
import { wordCaps, noOpObj, mapObj } from '@keg-hub/jsutils'

const useRunMessages = (messages) => useMemo(() => {
  return mapObj(messages, (__, meta) => meta)
}, [ messages ])


const bottomStyle = { maxHeight: 0, opacity: 0 }
const AlwaysScrollToBottom = () => {
  const bottomRef = useRef()
  // TODO: currently scrolls the whole page, only want to scroll the parent element
  // useEffect(() => bottomRef.current.scrollIntoView({behavior: 'smooth'}))
  return (<View ref={bottomRef} style={bottomStyle} />)
};

const Message = ({ styles=noOpObj, message, timestamp, type }) => {
  const defStyles = styles.default
  const msgStyles = styles[type]

  return (
    <View style={[defStyles.main, msgStyles.main]} >
      <Text style={[defStyles.text, msgStyles.text]} >
        { message }
      </Text>
    </View>
  )
}

export const RenderOutput = ({ testRunModel, testFile }) => {
  const styles = useStyle(`cmdOutput.renderOutput`)
  const messages = useRunMessages(testRunModel.messages)

  return testRunModel && (
    <View style={styles.main} >
      {messages.length && messages.map(message => (
        <Message
          styles={styles}
          key={message.timestamp}
          {...message}
        />
      ))}
      <AlwaysScrollToBottom />
    </View>
  ) || null
}
