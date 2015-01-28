env       = process.env.NODE_ENV || 'development'

config =
  development:
    serviio:
      url : 'http://example.com'


module.exports = config[env]