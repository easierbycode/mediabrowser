env       = process.env.NODE_ENV || 'development'

config =
  development:
    serviio:
      url : 'http://danielnas.loginto.me:23424'


module.exports = config[env]