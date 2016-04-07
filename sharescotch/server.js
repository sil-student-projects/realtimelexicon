// server.js

var express = require('express');
var app = express();
//require('redis');
var sharejs = require('share');
var sharedb = require("sharedb");
var database = require('sharedb-mongo')('mongodb://localhost:27017/different');

// set the view engine to ejs
app.set('view engine', 'ejs');

// public folder to store assets
app.use(express.static(__dirname + '/public'));

// routes for app
app.get('/', function(req, res) {
  res.render('pad');
});

/*
var options = {
 db: {type: 'redis'}
};
var livedb = require('livedb');
var sharejs = require('share');
var backend = livedb.client(livedb.memory());
var share = require('share').server.createClient({backend: backend});
*/


var backend = sharedb({db: database});
var share = sharejs.server.createClient({backend: backend});

// listen on port 8000 (for localhost) or the port defined for heroku
var port = process.env.PORT || 8000;
app.listen(port);
