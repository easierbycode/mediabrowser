requireDir  = require 'require-directory'
c           = requireDir module, "#{__dirname}/../server/controllers"


module.exports = (router) ->

  router.route('/cds/application')
    .get(c.application)

  router.route('/cds/search/:profile_id?/:file_type?/:term?/:start_index?/:requested_count?')
    .get(c.search)

  router.route('/cds/browse/:profile_id?/:object_id?/:browse_method?/:filter?/:start_index?/:requested_count?')
    .get(c.browse)

  router.route('/cds/resource/*')
    .get(c.resource)

  router.route('/cds/login')
    .post(c.login)

  router.route('/cds/fp')
    .get(c.fp)

  router.route('/')
    .get ( req, res ) ->
      res.sendFile 'custom.html',
        root  : "#{__dirname}/../public/custom"