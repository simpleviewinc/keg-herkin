const fs = require('fs')
const { parkin } = require('HerkinParkin/instance')
const { uuid, noOpObj } = require('@keg-hub/jsutils')

class FeatureParser {

  getFeatures(featureMeta=noOpObj) {
    const { location } = featureMeta

    return new Promise((res, rej) => {
      fs.readFile(location, (err, data) => {
        if(err) return rej(err)

        const parsed = (parkin.parse.feature(data.toString())[0] || {})

        return res({ ...featureMeta, ...parsed })
      })
    })
  }

}

const featureParser = new FeatureParser()

module.exports = {
  FeatureParser: featureParser
}