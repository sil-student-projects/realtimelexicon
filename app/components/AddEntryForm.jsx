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
    this.props.addEntry("");
  },
  render: function() {
    var doc = this.props.doc;
    var id = "addEntryInput"
    var key = makeKey(id);
    return (
      <div>
          <button className="addEntry" onClick={this.handleAddNew}>Add Entry</button>
      </div>
    );
  }
});

//<input type="text" id={id} value={doc.data[key]} placeholder="A New Word" onChange={this.updateAddEntryInput} />
