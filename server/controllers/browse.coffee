envConfig = require("#{__dirname}/../../config/env-config")
request   = require('request')


module.exports = (req, res) ->
  
  profile_id        = req.params.profile_id || '4'  # PS3
  # identification of the object (container or item) to retrieve; use 0 for the root container
  object_id         = req.params.object_id || 'V'  # /share/Multimedia
  # can be either BrowseMetadata (to get details of a particular object) or BrowseDirectChildren (returns the contents of a container)
  browse_method     = req.params.browse_method || 'BrowseDirectChildren'
  # defines what types of objects should be taken into account when making the request; can be items, containers or all
  filter            = req.params.filter || 'all'
  # the index of the first returned result for BrowseDirectChildren method; starts with 0; use 0 for BrowseMetadata method
  start_index       = req.params.start_index || '0'
  # the number of results to return for BrowseDirectChildren method; to retrieve all objects in the container use 0; use 1 for BrowseMetadata method
  requested_count   = req.params.requested_count || '18'
  # [Optional] if present and true, the user's presentation settings will be ignored and all the categories will be returned as if they were all enabled
  ignore_presentation_settings = 'true'
  # auth token
  auth_token        = req.query.authToken

  requestOptions =
    url: "#{envConfig.serviio.url}/cds/browse/#{profile_id}/#{object_id}/#{browse_method}/#{filter}/#{start_index}/#{requested_count}?authToken=#{auth_token}&ignorePresentationSettings=#{ignore_presentation_settings}"
    json: true


  req.pipe(request(requestOptions)).pipe res