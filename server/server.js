/***************************************************************************
    This file exports an "app" so that the task "gulp server" can
    call "app.listen(port)" to start a server.
    Important (realtime) pieces that this server uses are
      stream (read/write stream)
      sharedb-mongo (sharedb wrapper for mongodb)
      sharedb (an instance of the sharedb)
      browserChannel (a "socket" that the author of ShareDB wrote)
***************************************************************************/

var browserChannel = require('browserchannel').server;
var express = require('express');
var app = express();

var Duplex = require("stream").Duplex;

//create a wrapper for the mongodb "mydb" that sharedb can use
var db = require('sharedb-mongo')('mongodb://localhost:27017/mydb');

var sharedb = require("sharedb");
//give the wrapped db instance to sharedb
var share = sharedb({db: db});

//create browserChannel middleware for the app to use
var bc_middleware = browserChannel(function(session) {
  console.log('New session:', session.id,
              'from', session.address,
              'with cookies', session.headers.cookie);
  var stream = new Duplex({
    objectMode: true
  });

  //send the operation to the server in string form
  stream._write = function(op, encoding, next) {
    session.send(JSON.stringify(op));
    next();
  };
  //we're not trying to do anything with incoming data
  stream._read = function() {};

  stream.on("error", function(msg) {
    session.close();
  });
  stream.on("end", function() {
    session.close();
  });
  session.on("message", function(op) {
    //every time an op is received from the client, print it to examine
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

//expose the .tmp directory to the app and have a gulp task pipe all of necessary files to it
app.use(express.static(__dirname + "/../.tmp"));

app.get('/', function(req, res) {
  res.render('./../app/index.ejs');
});

module.exports = app;
