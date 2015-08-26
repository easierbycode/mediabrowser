angular.module('browse/browse.tpl.html', []).run [
  '$templateCache'
  (a) ->
    a.put 'browse/browse.tpl.html', templates.browse
]


angular.module( 'app' ).requires.push 'ui.bootstrap'


angular.module('app').controller 'BrowseCtrl', [
  '$scope'
  '$rootScope'
  '$location'
  'BrowseSharedData'
  'containerTitle'
  'containerId'
  'BrowseService'
  'AlertService'
  'PreferencesService'
  'QueueService'
  'CATEGORY_ID_IMAGE'
  # CUSTOM
  'UrlService'
  '$http'
  '$modal'
  (a, b, c, d, e, f, g, h, i, j, k, UrlService, $http, $modal) ->
    a.browse = if b.loggedIn then d.newData() else null
    a.thubmnailView = i.isGridView()
    a.containerTitle = e
    a.containerId = f
    a.containerFileType = g.getContainerFileType(f)
    a.lastPlayedItemId = null
    b.$broadcast('containerChanged', f, e)

    a.goBack = ->
      c.url a.backButtonUrl
      return

    a.numberOfLoadedItems = ->
      if a.browse then a.browse.items.length else 0

    a.objectAction = (d, e, f, i, j) ->
      if d then c.url(g.generateBrowseUrl(d, e, i, j)) else h.clear()
      a.selectedItemId = f
      if a.containerFileType == k then b.$broadcast('openImageViewer', f, 'browse', a.containerFileType) else b.$broadcast('openPlayer', f, 'browse', a.containerFileType, a.containerTitle)
      return

    a.generateBrowseUrl = (a, b, c) ->
      '#' + g.generateBrowseUrl(!0, a, b, c)

    a.addToQueue = (b) ->
      h.clear()
      j.addItemToQueue(a.browse.findItemById(b))
      return

    a.$on('viewChanged', (b, c) ->
      a.thubmnailView = c
      return
    )
    a.$on('playerClosed', (b, c) ->
      a.lastPlayedItemId = c
      return
    )


    # CUSTOM

    a.showDownloadModal = ( id ) ->

      url = UrlService.secureUrl "/cds/browse/serviigo_standard/#{id}/BrowseMetadata/items/0/0"

      $http.get( url ).success ( resp ) ->
        download  = resp.objects[0].contentUrls[0]
        template  = templates.downloadModal
          resolution  : download.resolution
          size        : "#{(download.fileSize / 1000000).toFixed( 1 )} MB"
          title       : resp.objects[0].title
          url         : UrlService.secureUrl download.url

        $modal.open
          animation : true
          template  : template


]