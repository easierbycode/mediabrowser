envConfig = require("#{__dirname}/../../config/env-config")
request   = require('request')


module.exports = (req, res) ->

  requestOptions =
    url: "#{envConfig.serviio.url}/cds/application"
    json: true


  req.pipe(request(requestOptions)).pipe(res)