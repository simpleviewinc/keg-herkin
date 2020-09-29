class StepParameter {
  regexp = undefined
  variable = false
  _value = undefined
  defaultValue = undefined

  constructor (value, regexp, defaultValue) {
    this.value = value
    this.defaultValue = defaultValue
    if (regexp) this.regexp = new RegExp(regexp)
  }

  get value() {
    return this._value || this.defaultValue
  }

  set value(str='') {
    this._value = str
  }

  get variable() {
    return this.variable || false
  }

  set variable(isVar) {
    this.variable = isVar
  }

  get displayValue() {
    let val = this.value
    this.variable && (val = '<' + val + '>')

    return val
  }

  get isSet() {
    return this.value !== this.defaultValue
  }

}

module.exports = {
  StepParameter
}