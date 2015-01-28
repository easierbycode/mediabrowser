envConfig = require('../../config/env-config')
request   = require('request')


module.exports = (req, res) ->

  requestOptions =
    url: "#{envConfig.serviio.url}/cds/login"
    json: true
    headers:
      Authorization: req.headers.authorization
      Date: req.headers['x-serviio-date']

    method: "POST"


  request requestOptions, (e, r, body) ->
    res.json body