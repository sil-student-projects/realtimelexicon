var http = require("http");
var sharedb = require("sharedb");
var express = require("express");
var app = express();

var WebSocket = require("ws");
var Duplex = require("stream").Duplex;

var server = http.createServer(
  app.use(express.static(__dirname + "/static")));

var wss = new WebSocket.Server({
  server: server
});
var share = sharedb();

wss.on("connection", function(session, req) {
  var stream = new Duplex({
    objectMode: true
  });

  stream.headers = session.upgradeReq.headers;
  stream.remoteAddress = session.upgradeReq.connection.remoteAddress;
  console.log("remote address:"+stream.remoteAddress);
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
var port = 8080;
server.listen(port, function() {
  return console.log("Listening on " + port);
});
