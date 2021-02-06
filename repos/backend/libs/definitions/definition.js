const { DefinitionTokens } = require('./definitionTokens')
const { uuid } = require('@keg-hub/jsutils')
const {
  NOT_INDEX,
  NOT_PARAMETER,
  NOT_REPLACE,
  REGEX_VARIANT
} = require('../../constants')


class Definition {

  constructor(name='', type='', variant, content) {
    this.type = type
    this.content = content
    this.variant = variant
    this.name = this.sanitizeName(name, type)
    this.uuid = uuid()
    this.tokens = this.toTokens(this.name)
  }

  sanitizeName(str=''){
    str = this.variant === REGEX_VARIANT ? str.source : str
    if (str[0] === '^') str = str.substr(1)
    if (str.charAt(str.length - 1) === '$') str = str.slice(0, -1)

    return str.replace(/\(\?:([^\|]+)+\|+([^\)]+)?\)/, '$1')
  }

  toTokens(str) {

    str = str.includes(NOT_REPLACE)
      ? str.replace(NOT_REPLACE, ` ${NOT_PARAMETER}`)
      : str


    const validators = this.variant === REGEX_VARIANT
      ? ['(', ')']
      : ['{', '}']

    return str.split(' ')
      .reduce((tokens, token, index) => {
        if(token === NOT_PARAMETER) this[NOT_INDEX] = index
        token && tokens.push(new DefinitionTokens(this, token, validators, index))
        return tokens
      }, [])
  }

}

module.exports = {
  Definition
}