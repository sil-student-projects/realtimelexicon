var sharedb = require("sharedb");

var db = require('sharedb-mongo')('mongodb://localhost:27017/mydb');
var backend = sharedb({db: db});

var connection = backend.connect();

/*
  database name = "mydb"
  database collection = "temporary"
  document _id = "hello-world-document"
*/
var doc = connection.get("temporary", "hello-world-document");

doc.subscribe(function(error){
  if (!doc.type) {
    doc.create({x: "hello"});
  }

  if (doc.type) {
    // `doc` ready, make ops
    setTimeout(function() { // timeout need for example (to delay after create)
      doc.submitOp([{p: ["x", 5], si: " world"}]);
      console.log("string insert is done.");
    }, 1000);
  }
});
