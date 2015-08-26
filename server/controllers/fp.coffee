path      = require('path')
envConfig = require(path.resolve(__dirname, '../../config/env-config'))
request   = require('request')


# /fp generates a FlowPlayer license - http://forum.serviio.org/viewtopic.php?p=77126#p77126
module.exports = (req, res) ->

  requestOptions =
    url: "#{envConfig.serviio.url}#{req.originalUrl}"
    json: true


  req.pipe(request(requestOptions)).pipe res