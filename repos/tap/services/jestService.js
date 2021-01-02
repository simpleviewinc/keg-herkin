import * as core from 'jest-lite'
import * as prettify from 'jest-lite/dist/prettify'

const { describe, it, expect, run } = core

class JestService {

  constructor(props){
    
  }

  build = () => {

  }

  run = () => {
    return run()
  }
  
  toHtml = (testResults, element) => {
    return prettify.toHTML(testResults, element)
  }
  
}

export {
  JestService
}