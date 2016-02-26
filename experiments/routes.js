var db = require('sharedb-mongo')('mongodb://localhost:27017/mydb');
var sharedb = require("sharedb");
var backend = sharedb({db: db});
//var connection = backend.connect();



exports.index = function(req, res) {
  res.render('index');
};

exports.submitop = function(req, res) {
  var doc_id = req.body.doc;
  var op = JSON.parse(req.body.op);

  console.log("doc_id:", doc_id);
  console.log("op:", op);

  var connection = backend.connect();
  var doc = connection.get("temporary", doc_id);
  doc.subscribe(function(err) {
    if (err) {
      res.send(err);
    }

    if (!doc.type) {
      doc.create(op);
      res.render('index', {data: JSON.stringify(doc.data, null, 2), id: doc.id});
    } else {
      doc.submitOp(op, function(err) {
        if (err) {
          res.send(err);
        }
        res.render('index', {data: JSON.stringify(doc.data, null, 2), id: doc.id});
      });
    }
  });
};
