const { StepParameter } = require('./stepParameter')
const { exists } = require('@keg-hub/jsutils')

const REGEXP_TESTER = /\(([^\)]+)\)/g
const REGEXP_DISPLAY_NAME = 'PARAMETER'
const REGEXP_NOT_PARAMETER = ' NOT_PARAMETER'

class Step {

  constructor(name='', type='') {
    this.type = type
    this.name = this.sanitizeName(name)
    this.displayName = this.name.replace(REGEXP_TESTER, REGEXP_DISPLAY_NAME)
    this.parameter = this.toParameters(this.name)
  }

  toString(indent='') {
    let str = `${indent}${this.type} `
    str += this.parameter.reduce((a, b) => (a + b.displayValue), '')
    str += '\n'

    return str
  }

  sanitizeName(str=''){
    if (str[0] === '^') str = str.substr(1)
    if (str.charAt(str.length - 1) === '$') str = str.slice(0, -1)

    return str.replace(/\(\?:([^\|]+)+\|+([^\)]+)?\)/, '$1')
  }

  toParameters(str) {
    let skip
    str = str.includes('( not)*') 
      ? str.replace('( not)*', REGEXP_NOT_PARAMETER) 
      : str
    const strSplit = str.split(' ')

    return strSplit.reduce((tokens, token, index) => {

      if(skip){
        skip = false
        return tokens
      }

      let regexp = undefined
      let value = undefined

      if(token === '('){
        const subStr = str.substring(index+1)
        regexp = subStr.slice(0, subStr.indexOf(')'))
      }
      else value = token

      if((exists(value) || regexp))
        tokens.push(new StepParameter(value, regexp, REGEXP_DISPLAY_NAME))
      
      return tokens
    }, [])
  }

}

module.exports = {
  Step
}