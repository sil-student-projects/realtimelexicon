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
            entry: doc.data[key],
            key: key
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
            entry: doc.data[key],
            key: key
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
                entry: doc.data[key],
                key: key
              });
            });
          }
        );
      },
      render: function() {
        var self = this;
        return (
          <div>
              <nav className="navbar navbar-inverse navbar-fixed-top"  id="sil-navbar">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                      <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" id="sil-navbar-brand">Realtime Dictionary</a>
                  </div>

                  <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav navbar-right">
                      <li><a>My Projects</a></li>
                      <li><a>Learn</a></li>
                      <li><a>Discuss</a></li>
                      <li><a>Profile Settings</a></li>
                    </ul>
                  </div>
                </div>
              </nav>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-3 col-md-2 sidebar">
                    <ul className="nav nav-sidebar">
                      <li className="active"><a>Word List<span className="sr-only"></span></a></li>
                    </ul>
                    <AddEntryForm addEntry={this.addEntry} doc={doc}/>
                    <TableOfContents entries={this.state.entries} select={self.selectEntry} remove={self.deleteEntry}/>
                  </div>
                  <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main" margin-top="-25px">
                    <h1 className="page-header">
                      <img src="lf_logo-beta.png" alt="Language Forge" id="sil-img"></img>
                      Realtime Dictionary
                    </h1>
                    <Entry entry={doc.data[self.state.key]} doc={doc}/>
                  </div>
                </div>
              </div>
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
