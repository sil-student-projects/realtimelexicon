var ShareDB = require('sharedb');
var db = require('sharedb-mongo')('mongodb://localhost:27017/mydb');

var obj = {db: db}
var backend = ShareDB(obj);

var connection = backend.connect();

//I do not yet know what connection.get REALLY does.
//I blindly tried this. Education/research needed.
var thing = connection.get('mydb', 1);

console.log(thing);