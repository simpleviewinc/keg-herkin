"use strict"
// const gherkin = require('gherkin-parser')
const { parseFeature } = require("./parseFeature")
const fs = require('fs')

class FeatureParser {

  getFeatures(file) {
    return new Promise((res, rej) => {
      fs.readFile(file, (err, data) =>
        err
          ? rej(err)
          : res(parseFeature(data.toString()))
      )
    })
  }

  // getFeaturesStream(file){
  //   return new Promise((res, rej) => {
  //     fs.createReadStream(file)
  //       .pipe(gherkin())
  //       .on('data', chunk => featureStr += chunk.toString())
  //       .on('end', () => res(JSON.parse(featureStr)))
  //       .on('error', err => rej(err))
  //   })
  // }

  addFeature(type) {
    
  }

}

const featureParser = new FeatureParser()

module.exports = {
  FeatureParser: featureParser
}