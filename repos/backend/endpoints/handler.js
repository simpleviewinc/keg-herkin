const { isObj } = require(`@keg-hub/jsutils`)
const { loadTemplate } = require(`../templates/loadTemplate`)

const page404Data = {
  title: 'Keg-Herkin - 404 Page not found',
  body: '<h4>Page not found!<h4>'
}

const logError = (error) => console.error(error)

const logResponse = (req, res) => {
  const message = {
    request: `${req.method} ${req.url}`,
    host: req.hostname,
    body: req.body,
    query: req.query,
    params: req.query
  }
  console.log(`REQUEST: ${message.request}`)
}

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
  logResponse(req, res)

  return res.json({
    data,
    status: res.statusCode,
  })
}

const handleHtmlResponse = (req, res, html, status) => {
  res.statusCode = status || 200
  logResponse(req, res)

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