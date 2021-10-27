const { isObj } = require(`@keg-hub/jsutils`)
const { Logger } = require(`@keg-hub/cli-utils`)
const { loadTemplate } = require(`../templates/loadTemplate`)

const page404Data = {
  title: 'Keg-Herkin - 404 Page not found',
  body: '<h4>Page not found!<h4>'
}

const logError = (error) => Logger.error(error)

const handleApiErr = (req, res, err, status) => {
  const error = {
    message: isObj(err) ? err.message : err || `An api error occurred!`
  }
  res.statusCode = status || 400
  logError(err.stack || err.message)

  return res.json({
    status: res.statusCode,
    error: error 
  })
}

const handleApiResponse = (req, res, data, status) => {
  res.statusCode = status || 200

  return res.json({
    data,
    status: res.statusCode,
  })
}

const handleHtmlResponse = (req, res, html, status) => {
  res.statusCode = status || 200

  res.set('Content-Type', 'text/html')
  res.send(html)
}

const handleHtmlErr = async (req, res, err, status) => {
  const error = {
    message: isObj(err) ? err.message : err || `An html error occurred!`
  }

  res.statusCode = status || 400
  logError(err.stack || err.message)

  res.set('Content-Type', 'text/html')
  const page404 = await loadTemplate('page404', page404Data)
  res.send(page404)
}

module.exports = {
  apiErr: handleApiErr,
  apiResponse: handleApiResponse,
  htmlErr: handleHtmlErr,
  htmlResponse: handleHtmlResponse,
}