window.sharedb = require("sharedb/lib/client");

var React = require('react');
var ReactDOM = require('react-dom');

var Entry = require('./components/Entry.jsx');
var TableOfContents = require('./components/TableOfContents.jsx');
var AddForm = require('./components/AddForm.jsx');

var socket = new BCSocket('/channel');
var connection = new window.sharedb.Connection(socket);
var doc = connection.get("temporary", "hello-world-document");

doc.subscribe(function(error) {
  if (error) {
    console.log("Failed to subscribe.", error);
  }
  if (!doc.type) {
    doc.create({"laugh": {path: ["laugh"],
                          word: "laugh"},
                "love": {path: ["love"],
                         word: "love"},
                "lead": {path: ["lead"],
                         word: "lead"}});
  }

  var Dictionary = React.createClass({
    getInitialState: function() {
      return {entries: doc.data};
    },
    selectEntry: function(entry) {
      var self = this;
      return (function() {
        self.setState({
          entries: doc.data,
          entry: doc.data[entry]
        });
      });
    },
    addEntry: function(entry) {
      var self = this;
      var ins_obj = {word: entry, path: [entry]};
      doc.submitOp([{p: [entry], oi: ins_obj}], function() {
        self.setState({
          entries: doc.data,
          entry: doc.data[entry]
        });
      });
    },
    deleteEntry: function(entry) {
      var self = this;
      return (
        function() {
          doc.submitOp([{p: [entry], od: doc.data[entry]}], function() {
            self.setState({
              entries: doc.data
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
            <AddForm addEntry={this.addEntry} />
            <TableOfContents entries={this.state.entries} select={self.selectEntry} remove={self.deleteEntry}/>
            <Entry entry={this.state.entry} />
          </div>
      )
    }
  });

  ReactDOM.render(<Dictionary />, the_div);
});
