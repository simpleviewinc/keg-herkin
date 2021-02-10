import { View } from '@keg-hub/keg-components/view'
import { Text } from '@keg-hub/keg-components/text'
import { Loading } from '@keg-hub/keg-components/loading'

export const TestsRunning = ({ styles, message='Running Tests' }) => {
  return (
    <>
      <View
        className={`runner-isrunning-background`}
        style={styles?.isRunning?.background}
      />
      <View
        className={`runner-isrunning-container`}
        style={styles?.isRunning?.container}
      >
        <Loading
          className={`runner-isrunning-loading`}
          styles={styles?.isRunning}
          type={'primary'}
        />
        <Text
          className={`runner-isrunning-text`}
          style={styles?.isRunning.text}
        >
          {message}
        </Text>
      </View>
    </>
  )
}
