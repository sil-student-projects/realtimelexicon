var browserChannel = require('browserchannel').server;
var http = require("http");
var express = require('express');
var app = express();

var Duplex = require("stream").Duplex;

var db = require('sharedb-mongo')('mongodb://localhost:27017/mydb');
var sharedb = require("sharedb");
var share = sharedb({db: db});

var bc_middleware = browserChannel(function(session) {
  console.log('New session:', session.id,
              'from', session.address,
              'with cookies', session.headers.cookie);
  var stream = new Duplex({
    objectMode: true
  });

  stream._write = function(op, encoding, next) {
    session.send(JSON.stringify(op));
    next();
  };
  stream._read = function() {};
  stream.on("error", function(msg) {
    session.close();
  });
  stream.on("end", function() {
    session.close();
  });
  session.on("message", function(op) {
    console.log('op', JSON.stringify(JSON.parse(op), null, 2));
    stream.push(op);
  });
  session.on("close", function() {
    stream.push(null);
    stream.emit("close");
    stream.emit("end");
    stream.end();
  });

  share.listen(stream);
});

app.use(bc_middleware);

app.use(express.static(__dirname + "/../.tmp"));

app.get('/', function(req, res) {
  res.render('./../app/index.ejs');
});

module.exports = app;
