var sharedb = require("sharedb/lib/client");

var connection = new sharedb.Connection(new WebSocket("ws://localhost:8080"));

var doc = connection.get("temporary", "test-doc");

doc.subscribe(function(error){
  if (error) {
    console.log("Failed to subscribe.", error);
  }
  if (!doc.type) {
    doc.create({x: "hello"});
  }

  setInterval(function() {
    doc.submitOp([{p: ["x", 5], si: " world"}]);
  }, 2000);
});
