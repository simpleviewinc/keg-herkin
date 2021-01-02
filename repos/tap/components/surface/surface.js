import React from 'react'
import { Section, ItemHeader, Row, H3, Text } from 'SVComponents'
import { useTheme } from '@keg-hub/re-theme'
import { wordCaps } from '@keg-hub/jsutils'

const SurfaceHeader = ({ styles, title, prefix }) => {
  return (
    <ItemHeader
      className='surface-header'
      styles={styles?.itemHeader}
      CenterComponent={(
        <H3 style={styles?.heading} >
          { prefix &&  (
            <Text style={styles?.prefix}>
              {prefix}
            </Text>
          )}
          <Text style={styles?.title}>
            { wordCaps(`${title}`) }
          </Text>
        </H3>
      )}
    />
  )
}

export const Surface = props => {
  const theme = useTheme()
  const { title, prefix, styles } = props
  const surfaceStyles = theme.get(theme.surface, styles)

  return (
    <Section className='surface' style={surfaceStyles?.main} >
      {title && (<SurfaceHeader
        title={title}
        prefix={prefix}
        styles={surfaceStyles?.header}
      />)}
      <Row className='surface-content' style={surfaceStyles?.content} >
        {props.children}
      </Row>
    </Section>
  )
}