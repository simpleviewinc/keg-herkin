import React from "react"
import { wordCaps } from '@keg-hub/jsutils'
import { Surface } from 'SVComponents/surface'
import { Row } from '@keg-hub/keg-components/row'
import { Icon } from '@keg-hub/keg-components/icon'
import { View } from '@keg-hub/keg-components/view'
import { Text } from '@keg-hub/keg-components/text'
import { Grid } from '@keg-hub/keg-components/grid'
import { CheckFilled, TimesFilled } from 'SVAssets/icons'
import { useStyle, useTheme } from '@keg-hub/re-theme'

const TestResult = ({ block, errors, styles, test, type }) => {

  const iconSize = styles?.icon?.ftSz || styles?.icon?.fontSize || 20
  const iconStroke = styles?.icon?.c || styles?.icon?.color
  const IconComponent = type === 'pass' ? CheckFilled : TimesFilled

  return (
    <>
      <View
        className={`results-${type}-container`}
        style={styles?.main}
      >
        <Text
          className={`results-${type}-label`}
          style={styles?.label}
        >
          <IconComponent
            size={iconSize}
            stroke={iconStroke}
            fill={iconStroke}
            style={styles?.icon}
          />
          { wordCaps(type) }
        </Text>
        <Text
          className={`results-${type}-block`}
          style={styles?.block}
        >
          {" " + block + " › "}
        </Text>
        <Text
          className={`results-${type}-test`}
          style={styles?.test}
        >
          {test}
        </Text>
      </View>
      {errors.length > 0 && (
        <View
          className={`results-${type}-error-main`}
          style={styles?.error.main}
        >
          <Text
            className="results-${type}-error-text"
            style={styles?.error.text}
          >
            {errors[0].slice(0, errors[0].indexOf(" at "))}
          </Text>
        </View>
      )}
    </>
  )
}

const BuildResults = ({ results }) => {
  const styles = useStyle(`runner.results`)

  return results.map((result) => {
    const { testPath, errors, id } = result
    const [_, block, test] = testPath
    const type = errors.length ? 'fail' : 'pass'
    return (
      <View key={`${block}-${test}-${id}`}>
        <TestResult
          test={test}
          type={type}
          block={block}
          errors={errors}
          styles={styles[type]}
        />
      </View>
    )
  })
}

export const Results = ({ results, title, prefix, styles }) => {
  const theme = useTheme()
  const failedCount = results.reduce((count, result) => (count + result.errors.length), 0)

  // TODO: Update titleStyle to have a consistent identity
  return results && results.length
    ? (
        <Surface
          className={`results-main`}
          title={failedCount ? `${failedCount} Failed Test(s)` : `Tests Passed`}
          titleStyle={failedCount && { color: theme?.tapColors?.dangerDark }}
          capitalize={false}
          styles={styles}
          prefix={prefix || `Results`}
        >
          <Grid className={`results-grid`} style={styles?.grid} >
            <Row className='results-results-row' style={styles?.row} >
              <BuildResults results={results} />
            </Row>
          </Grid>
        </Surface>
      )
    : null
}

