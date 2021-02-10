import React from "react"
import { wordCaps } from '@keg-hub/jsutils'
import { useTheme } from '@keg-hub/re-theme'
import { View } from '@keg-hub/keg-components/view'
import { Text } from '@keg-hub/keg-components/text'
import { Row } from '@keg-hub/keg-components/row'
import { Grid } from '@keg-hub/keg-components/grid'
import { Icon } from '@keg-hub/keg-components/icon'
import { Surface } from 'SVComponents/surface'
import { CheckFilled } from 'SVAssets/icons'


const TestResult = ({ block, errors, label, styles, test, type }) => {

  const iconSize = styles?.icon?.ftSz || styles?.icon?.fontSize || 20
  const iconStroke = styles?.icon?.c || styles?.icon?.color

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
          <CheckFilled
            size={iconSize}
            stroke={iconStroke}
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
  const theme = useTheme()
  const styles = theme.get(`runner.results`)

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
          label={type === `pass` ? `✓ PASS` :  `× FAIL`}
          styles={styles[type]}
        />
      </View>
    )
  })
}

export const Results = ({ results, title, prefix, styles }) => {
  const theme = useTheme()
  const failedCount = results.reduce((count, result) => (count + result.errors.length), 0)

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

