var http = require('http');
var express = require('express');
var app = express();


var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname));
app.set('view engine', 'jade');


var routes = require('./routes');
app.get('/', routes.index);
app.post('/submitop', routes.submitop);


var server = http.createServer(app);
var port = 3000;
server.listen(port, function() {
  console.log("Server listening on port", port);
});
