var React = require('react');

var MeaningsContainer = require('./MeaningsContainer.jsx');

module.exports = React.createClass({
  addMeaning: function() {
    var self = this;
    var doc = this.props.doc;
    var entry = this.props.entry;
    var arrayPosition = entry.meanings.length;
    var newPath = entry.path.slice();

    newPath.push("meanings");
    newPath.push(arrayPosition);

    var ins_obj = {meaning: "", path: newPath};

    doc.submitOp([{p: newPath, li: ins_obj}], function() {
      self.setState({
        entry: entry
      });
    });
  },
  updateWord: function(entry) {
    var self = this;
    var doc = self.props.doc;
    var entryKey = entry.path[0];
    return (function() {
      var input = document.getElementById(entryKey);
      var copyOfPath = JSON.parse(JSON.stringify(entry.path));
      copyOfPath.push("word");
      copyOfPath.push(0);
      var ops = [];
      ops.push({p: copyOfPath, sd: entry.word});
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
