var browserChannel = require('browserchannel').server;
var http = require("http");
var sharedb = require("sharedb");
var express = require("express");
var app = express();

var WebSocket = require("ws");
var Duplex = require("stream").Duplex;

var share = sharedb();

var bc_middleware = browserChannel(function(session) {
  console.log('New session:', session.id,
              'from', session.address,
              'with cookies', session.headers.cookie);
  var stream = new Duplex({
    objectMode: true
  });

  //stream.headers = session.upgradeReq.headers;
  //stream.remoteAddress = session.upgradeReq.connection.remoteAddress;
  //console.log("remote address:"+stream.remoteAddress);
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

var server = http.createServer(
  app.use(express.static(__dirname + "/static")));

var port = 8080;
server.listen(port, function() {
  return console.log("Listening on " + port);
});
