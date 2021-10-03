module.exports = {
  ...require('./setupCors'),
  ...require('./setupLogger'),
  ...require('./setupServer'),
  ...require('./setupStatic'),
  ...require('./setupVNCProxy'),
}