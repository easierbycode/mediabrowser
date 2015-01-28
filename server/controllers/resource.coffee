envConfig = require('../../config/env-config')
request   = require('request')


module.exports = (req, res) ->
  # example = "http://#{config.serviio.url}/cds/resource/3586/MEDIA_ITEM/FLV-0/ORIGINAL?profile=flv_player&authToken=86bf9af7dd8e4190b00f179afab522c6"

  requestOptions =
    url: "#{envConfig.serviio.url}#{req.originalUrl}"
    json: true


  req.pipe(request(requestOptions)).pipe res