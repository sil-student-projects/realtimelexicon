window.sharedb = require("sharedb/lib/client");

var React = require('react');
var ReactDOM = require('react-dom');

var Entry = require('./components/Entry.jsx');
var TableOfContents = require('./components/TableOfContents.jsx');
var AddEntryForm = require('./components/AddEntryForm.jsx');

var socket = new BCSocket('/channel');
var connection = new window.sharedb.Connection(socket);
var doc = connection.get("temporary", "hello-world-document");

var makeKey = require("./functions.js").makeKey;

doc.subscribe(function(error) {
  if (error) {
    console.log("Failed to subscribe.", error);
  } else {
    if (!doc.type) {
      var laughKey = makeKey("laugh"),
          loveKey = makeKey("love"),
          leadKey = makeKey("lead"),
          addEntryInputKey = makeKey("addEntryInput");
      var obj = {};
      obj[laughKey] = {path: [laughKey], word: "laugh", meanings: []};
      obj[loveKey] = {path: [loveKey], word: "love", meanings: []};
      obj[leadKey] = {path: [leadKey], word: "lead", meanings: []};
      obj[addEntryInputKey] = "";
      doc.create(obj);
    }

    var Dictionary = React.createClass({
      getInitialState: function() {
        return {entries: doc.data};
      },
      selectEntry: function(key) {
        var self = this;
        return (function() {
          self.setState({
            entries: doc.data,
            entry: doc.data[key]
          });
        });
      },
      addEntry: function(entry) {
        var self = this;
        var key = makeKey(entry);
        var ins_obj = {word: entry, path: [key], meanings: []};
        doc.submitOp([{p: [key], oi: ins_obj}], function() {
          self.setState({
            entries: doc.data,
            entry: doc.data[key]
          });
        });
      },
      deleteEntry: function(key) {
        var self = this;
        return (
          function() {
            doc.submitOp([{p: [key], od: doc.data[key]}], function() {
              self.setState({
                entries: doc.data,
                entry: null
              });
            });
          }
        );
      },
      render: function() {
        var self = this;
        return (
            <div>
              <h1>Dictionary</h1>
              <AddEntryForm addEntry={this.addEntry} doc={doc}/>
              <TableOfContents entries={this.state.entries} select={self.selectEntry} remove={self.deleteEntry}/>
              <Entry entry={this.state.entry} doc={doc}/>
            </div>
        )
      }
    });
  }

  doc.on("op", function() {
    ReactDOM.render(<Dictionary />, the_div);
  });

  ReactDOM.render(<Dictionary />, the_div);
});
