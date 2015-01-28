envConfig = require('../../config/env-config')
request   = require('request')


module.exports = (req, res) ->
  profile_id       = req.params.profile_id || '4'  # PS3
  file_type        = req.params.file_type || 'v'  # videos
  # search term; can be multiple words
  term             = req.params.term
  # the index of the first returned result within each search category; starts with 0
  start_index      = req.params.start_index || 0
  # the number of results to return for each search category; to retrieve max. objects use 0
  requested_count  = req.params.requested_count || 0
  # auth token
  auth_token        = req.query.authToken
  
  requestOptions =
    url: "#{envConfig.serviio.url}/cds/search/#{profile_id}/#{file_type}/#{term}/#{start_index}/#{requested_count}?authToken=#{auth_token}"
    json: true


  req.pipe(request(requestOptions)).pipe(res)