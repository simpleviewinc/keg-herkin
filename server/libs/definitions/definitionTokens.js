const { NOT_PARAMETER, NOT_REPLACE } = require('../../constants')

const extractDynamic = (value, validators=[], variant) => {
  const valSplit = value.split(validators[1])
  const parts = valSplit.reduce((params, part) => {
    const regEx = new RegExp(`\\${ validators[0] }`, `g`)
    const cleaned = part.replace(regEx, '')

    const param = cleaned.indexOf('\\d') !== -1
      ? { variant, type: 'number', match: value }
      : cleaned.indexOf(`|`) !== -1
        ? {
            variant,
            type: 'select',
            match: value,
            option: cleaned.split(`|`),
          }
        : null

    param && params.push(param)
    return params
  }, [])

  return parts

}

const checkDynamic = (value, validators=[], variant) => {
  switch(value[0]){
    case `"`: {
      return [{ variant, type: `string`, match: value.slice(1, value.length - 1) }]
    }
    case validators[0]: {
      return extractDynamic(value, validators, variant)
    }
    default: {
      return value === NOT_PARAMETER
        ? [{ variant, type: `boolean`, match: NOT_REPLACE }]
        : false
    }
  }
}

class DefinitionTokens {
  value = undefined

  constructor (definition, value, validators, index) {
    this.value = value
    this.index = index
    const params = checkDynamic(value, validators, definition.variant)
    params && Object.assign(this, { params, dynamic: true })
  }

  displayValue() {
    return this.value
  }

}

module.exports = {
  DefinitionTokens
}