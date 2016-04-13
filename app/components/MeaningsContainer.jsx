var React = require('react');

module.exports = React.createClass({
  removeMeaning: function(current) {
    var self = this;
    var doc = self.props.doc;
    var copy = JSON.parse(JSON.stringify(current));
    return (function() {
      var entryKey = copy.path[0];
      var meaningsLength = doc.data[entryKey].meanings.length;
      var indexOfDeleted = copy.path[2];
      var ops = [];
      for(var i = indexOfDeleted + 1; i < meaningsLength; i++) {
        ops.push({p: [entryKey, "meanings", i, "path", 2], na: -1});
      }
      ops.push({p: copy.path, ld: copy});
      doc.submitOp(ops, function() {
        self.setState({
          entry: doc.data[entryKey]
        });
      });
    });
  },
  render: function() {
    if (this.props.meanings.length > 0) {
      var self = this;
      return (
        <div>
          {
          this.props.meanings.map(function(current, index) {
            return (
              <div key={"meaning"+index}>
                <input value={current.meaning} placeholder="Enter Meaning"></input> <button onClick={self.removeMeaning(current)}>delete</button>
              </div>
            );
          })
          }
        </div>
      );
    } else {
      return (
        <div>
          No meanings yet
        </div>
      );
    }
  }
});
