import React from "react"
import { useTheme } from '@keg-hub/re-theme'
import { View } from '@keg-hub/keg-components/view'
import { Text } from '@keg-hub/keg-components/text'
import { Row } from '@keg-hub/keg-components/row'
import { Grid } from '@keg-hub/keg-components/grid'
import { Surface } from 'SVComponents/surface'

const TestResult = ({ block, errors, label, styles, test, type }) => {
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
          { label }
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
  return results && results.length
    ? (
        <Surface
          className={`results-main`}
          title={title || 'N/A'}
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

