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
  render: function() {
    var entry = this.props.entry;
    if (entry) {
      return (
        <div>
          <h3>{entry.word}</h3>
          <button onClick={this.addMeaning}>Add Meaning</button>
          <MeaningsContainer meanings={entry.meanings} doc={this.props.doc}/>
        </div>
      );
    } else {
        return(<div>No Word Yet!</div>);
    }
  }
});
