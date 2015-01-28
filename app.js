var trans = require('coffee-script');
if (trans.register) {
  trans.register();
}

var express   = require('express');

var app = express();


app.use(express.static(__dirname+'/public'));

var router = express.Router();
require('./config/routes')(router);
app.use(router);


module.exports = app;