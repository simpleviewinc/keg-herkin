const { runFeatures } = require('HerkinRepos/testUtils/parkin/runFeatures')

runFeatures({
  name: process.env.HERKIN_FEATURE_NAME,
  tags: process.env.HERKIN_FEATURE_TAGS
})