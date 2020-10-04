const { StepParameter } = require('./stepParameter')
const { exists, uuid, isStr } = require('@keg-hub/jsutils')

const REGEXP_TESTER = /\(([^\)]+)\)/g
const REGEXP_DISPLAY_NAME = 'PARAMETER'
const REGEXP_NOT_PARAMETER = ' NOT_PARAMETER'
const EXPRESSION_VARIANT = `expression`
const REGEX_VARIANT = `regex`

const checkDynamicVariant = (str, token, validators, index) => {
  let value = undefined
  let dynamic = undefined

  if(token === validators[0]){
    const subStr = str.substring(index+1)
    dynamic = subStr.slice(0, subStr.indexOf(validators[1]))
  }
  else value = token

  return { value, dynamic }
}

class Step {

  constructor(name='', type='', altType) {
    this.type = type
    altType && (this.altType = altType)
    this.variant = isStr(name) ? `expression` : `regex`
    this.name = this.sanitizeName(name, type)
    this.uuid = uuid()
    this.displayName = this.name.replace(REGEXP_TESTER, REGEXP_DISPLAY_NAME)
    this.parameter = this.toParameters(this.name)
  }

  toString(indent='') {
    let str = `${indent}${this.altType || this.type} `
    str += this.parameter.reduce((a, b) => (a + b.displayValue), '')
    str += '\n'

    return str
  }

  sanitizeName(str=''){
    str = this.variant === REGEX_VARIANT ? str.source : str

    if (str[0] === '^') str = str.substr(1)
    if (str.charAt(str.length - 1) === '$') str = str.slice(0, -1)

    return str.replace(/\(\?:([^\|]+)+\|+([^\)]+)?\)/, '$1')
  }

  toParameters(str) {
    let skip
    str = str.includes('( not)*') 
      ? str.replace('( not)*', REGEXP_NOT_PARAMETER)
      : str

    const validators = this.variant === EXPRESSION_VARIANT
      ? ['(', ')']
      : ['{', '}']

    return str.split(' ')
      .reduce((tokens, token, index) => {

        if(skip){
          skip = false
          return tokens
        }

        const { value, dynamic } = checkDynamicVariant(str, token, validators, index)

        if((exists(value) || dynamic))
          tokens.push(new StepParameter(value, dynamic, REGEXP_DISPLAY_NAME))

        return tokens
      }, [])
  }

}

module.exports = {
  Step
}