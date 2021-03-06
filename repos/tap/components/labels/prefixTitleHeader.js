import React from 'react'
import { H3, Text } from 'SVComponents'
import { wordCaps } from '@keg-hub/jsutils'

/**
 * PrefixTitleHeader - {prefix} - {title}
 * example: Hello - World
 * @param {Object} props
 * @param {Object} props.styles
 * @param {string} props.prefix - value to go first
 * @param {string} props.title - value to go after the dash
 * @param {Object} props.titleStyle
 * @param {Boolean} props.capitalize
 * 
 * @returns {Component}
 */
export const PrefixTitleHeader = (props) => {
  const {
    styles,
    prefix,
    title,
    titleStyle,
    capitalize
  } = props

  return (
    <H3 style={styles?.heading} >
      { prefix && (
        <Text style={styles?.prefix}>
          {prefix}
        </Text>
      )}
      { title && (
        <>
          {prefix && (<Text style={styles?.prefix}> - </Text>)}
          <Text style={[styles?.title, titleStyle]}>
            { capitalize ? wordCaps(`${title}`) : title }
          </Text>
        </>
      )}
    </H3>
  )
}