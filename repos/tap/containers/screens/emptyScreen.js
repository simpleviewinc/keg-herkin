import React from 'react'
import { Row, Section, H6 } from 'SVComponents'
import { useTheme } from '@keg-hub/re-theme'

export const EmptyScreen = props => {
  const theme = useTheme()
  const screenStyles = theme?.screens?.empty || {}

  return props?.message 
  ? (
      <Section className='screen-empty' style={screenStyles.main} >
        <Row>
          { props.children || (
            <H6 className='screen-empty-message' style={screenStyles.message} >
              { props.message }
            </H6>
          )}
        </Row>
      </Section>
    )
  : null
}