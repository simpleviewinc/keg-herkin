"use strict"

const fs = require('fs')
const { uuid, noOpObj } = require('@keg-hub/jsutils')

const R_NEWLINE = /\r?\n/g
const R_TAG = /^\s*@(.*)$/
const R_COMMENT = /^\s*#(.*)$/
const R_FEATURE = /^\s*Feature:(.*)$/
const R_AS = /^\s*As (.*)$/
const R_I_WANT = /^\s*I want (.*)$/
const R_SO_THAT = /^\s*So that (.*)$/
const R_IN_ORDER = /^\s*In order (.*)$/
const R_SCENARIO = /^\s*Scenario:(.*)$/
const R_GIVEN = /^\s*Given (.*)$/
const R_WHEN = /^\s*When(.*)$/
const R_THEN = /^\s*Then (.*)$/
const R_AND = /^\s*And (.*)$/
const R_BUT = /^\s*But (.*)$/

const extract = (line, regex, index) => {
  return line.match(regex)[index].trim()
}

const featureFactory = (feature, content, featureMeta=noOpObj) => {
  return {
    feature,
    content,
    ...featureMeta,
    uuid: uuid(),
    tags: [],
    comments: {},
    scenarios: [],
  }
}

const scenarioFactory = scenario => {
  return { scenario, uuid: uuid(), steps: [] }
}

const stepFactory = (type, step, altType) => {
  const built = { step, type, uuid: uuid() }
  altType && (built.altType = altType)

  return built
}

const addReason = (feature, reason) => {
  reason
    ? !feature.reason
      ? (feature.reason = reason)
      : (feature.reason += `\n${reason}`)
    : null
}

const parseFeature = (content, featureMeta) => {

  let lines = (content || '').toString().split(R_NEWLINE)
  let feature = featureFactory(false, content, featureMeta)
  let scenario = scenarioFactory(false)
  const features = []
  return lines.reduce((extra, line, index) => {

    if (R_TAG.test(line)){
      const tags = extract(line, R_TAG, 0)
      feature.tags = feature.tags.concat(tags.split(' '))
    }
    else if(R_COMMENT.test(line)){
      const comment = extract(line, R_COMMENT, 1)
      feature.comments[index] = comment
    }
    else if (R_FEATURE.test(line)) {
      if(!feature.feature){
        feature.feature = extract(line, R_FEATURE, 1)
        if(extra.indexOf(feature) === -1) extra.push(feature)
      }
      else feature = featureFactory(extract(line, R_FEATURE, 1), content, featureMeta)
    }
    else if (R_AS.test(line)) {
      feature.perspective = extract(line, R_AS, 0)
    }
    else if (R_I_WANT.test(line)) {
      feature.desire = extract(line, R_I_WANT, 0)
    }
    else if (R_SO_THAT.test(line)) {
      addReason(feature, extract(line, R_SO_THAT, 0))
    }
    else if (R_IN_ORDER.test(line)) {
      addReason(feature, extract(line, R_IN_ORDER, 0))
    }
    else if (R_SCENARIO.test(line)) {
      if(!scenario.scenario) scenario.scenario = extract(line, R_SCENARIO, 1)
      else scenario = scenarioFactory(extract(line, R_SCENARIO, 1))

      if(feature.scenarios.indexOf(scenario) === -1) feature.scenarios.push(scenario)
    }
    else if (R_GIVEN.test(line)) {
      scenario.steps.push(stepFactory('given', extract(line, R_GIVEN, 1)))
    }
    else if (R_WHEN.test(line)) {
      scenario.steps.push(stepFactory('when', extract(line, R_WHEN, 1)))
    }
    else if (R_THEN.test(line)) {
      scenario.steps.push(stepFactory('then', extract(line, R_THEN, 1)))
    }
    else if (R_AND.test(line)) {
      scenario.steps.push(stepFactory('and', extract(line, R_AND, 1), `when`))
    }
    else if (R_BUT.test(line)) {
      scenario.steps.push(stepFactory('but', extract(line, R_BUT, 1), `when`))
    }

    return extra
  }, features)

}

class FeatureParser {

  getFeatures(featureMeta=noOpObj) {
    const { fullPath, testPath } = featureMeta

    return new Promise((res, rej) => {
      fs.readFile(fullPath, (err, data) =>
        err
          ? rej(err)
          : res(parseFeature(data.toString(), featureMeta))
      )
    })
  }

}

const featureParser = new FeatureParser()

module.exports = {
  FeatureParser: featureParser
}