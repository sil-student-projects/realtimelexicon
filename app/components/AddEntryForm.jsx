var React = require('react');

var makeKey = require("./../functions.js").makeKey;

module.exports = React.createClass({
  updateAddEntryInput: function() {
    var self = this;
    var addEntryInput = document.getElementById("addEntryInput");
    var doc = this.props.doc;
    var addEntryInputKey = makeKey("addEntryInput");

    var ops = [];
    ops.push({p: [addEntryInputKey, 0], sd: doc.data[addEntryInputKey]});
    ops.push({p: [addEntryInputKey, 0], si: addEntryInput.value});

    doc.submitOp(ops);
  },
  handleAddNew: function() {
    var self = this;
    var doc = this.props.doc;
    var addEntryInputKey = makeKey("addEntryInput");
    self.props.addEntry(doc.data[addEntryInputKey]);
    doc.submitOp({p: [addEntryInputKey, 0], sd: doc.data[addEntryInputKey]});
  },
  render: function() {
    var doc = this.props.doc;
    var id = "addEntryInput"
    var key = makeKey(id);
    return (
      <div>
          <input type="text" id={id} value={doc.data[key]} placeholder="A new word" onChange={this.updateAddEntryInput} />
          <button onClick={this.handleAddNew}>Add Entry</button>
      </div>
    );
  }
});
