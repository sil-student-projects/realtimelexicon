/***************************************************************************
  This will be the component that is displayed upon selecting a particular
  Entry from the TableOfContents to view.

  This component needs to be able to add meanings so that it can rerender
  the meanings container with the new meanings every time one is added.
***************************************************************************/

var React = require('react');

var makeKey = require("./../functions.js").makeKey;

var MeaningsContainer = require('./MeaningsContainer.jsx');

module.exports = React.createClass({
  addMeaning: function() {
    var self = this;
    var doc = this.props.doc;
    var entry = this.props.entry;
    var newKey = makeKey();
    //make a copy of the path instead of using the original path
    var newPath = entry.path.slice();

    //push "meanings" and the newKey into the path so that meaning knows
    //where it is in the document
    newPath.push("meanings");
    newPath.push(newKey);

    var ins_obj = {meaning: "", path: newPath};

    doc.submitOp([{p: newPath, oi: ins_obj}], function() {
      self.setState({
        entry: entry
      });
    });
  },
  updateWord: function(entry) {
    var self = this;
    var doc = self.props.doc;
    //the key of the entry is always the first element in the path
    var entryKey = entry.path[0];
    return (function() {
      //grab the input field for this word
      var input = document.getElementById(entryKey);

      //work with a copy of the path instead of the original path
      var copyOfPath = JSON.parse(JSON.stringify(entry.path));

      //push "word" and index 0 into the path so we can reference the entire
      //string of the word
      copyOfPath.push("word");
      copyOfPath.push(0);

      //create an array of operations to submit on the doc in order
      var ops = [];
      //first, delete the entire word string
      ops.push({p: copyOfPath, sd: entry.word});
      //second, insert the value that should be there
      ops.push({p: copyOfPath, si: input.value});
      
      doc.submitOp(ops, function() {
        self.setState({
          entries:doc.data,
        });
      });
    });
  },
  render: function() {
    var self = this;
    var entry = this.props.entry;
    if (entry) {
      var key = entry.path[0];
      return (
        <div>
          <h2 className="sub-header">Selected Word: {entry.word}</h2>
          <div className="sil-word">
            <div className="input-group">
              <span className="input-group-addon" id="basic-addon1">Word</span>
              <input type="text" className="form-control" aria-describedby="basic-addon1" id={key} value={entry.word} placeholder="Enter Word" onChange={self.updateWord(entry)}></input>
            </div>
          </div>
          <button onClick={this.addMeaning} className="meaning-button">Add Meaning</button>
          <MeaningsContainer meanings={entry.meanings} doc={this.props.doc}/>
        </div>
      );
    } else {
        return(<div><h3>No Word Yet!</h3></div>);
    }
  }
});
