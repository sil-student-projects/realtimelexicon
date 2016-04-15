var React = require('react');

module.exports = React.createClass({
  removeMeaning: function(current) {
    var self = this;
    var doc = self.props.doc;
    return (function() {
      var entryKey = current.path[0];
      var meaningsLength = doc.data[entryKey].meanings.length;
      var indexOfDeleted = current.path[2];
      var ops = [];
      for(var i = indexOfDeleted + 1; i < meaningsLength; i++) {
        ops.push({p: [entryKey, "meanings", i, "path", 2], na: -1});
      }
      ops.push({p: current.path, ld: current});
      doc.submitOp(ops, function() {
        self.setState({
          entry: doc.data[entryKey]
        });
      });
    });
  },
  updateMeaning: function(meaning) {
    var self = this;
    var doc = self.props.doc;
    return (function() {
      var entryKey = meaning.path[0];
      var inputKey = entryKey + meaning.path[2];
      var input = document.getElementById(inputKey);
      var copyOfMeaningPath = JSON.parse(JSON.stringify(meaning.path));
      copyOfMeaningPath.push("meaning");
      copyOfMeaningPath.push(0);
      var ops = [];
      ops.push({p: copyOfMeaningPath, sd: meaning.meaning});
      ops.push({p: copyOfMeaningPath, si: input.value});

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
                var key = current.path[0] + index;
                return (
                  <div key={"meaning"+index}>
                    <div className="sil-input">
                      <div className="input-group">
                          <span className="input-group-addon" id="basic-addon1">Meaning</span>
                          <input type="text" className="form-control" aria-describedby="basic-addon1" id={key} value={current.meaning} placeholder="Enter Meaning" onChange={self.updateMeaning(current)}></input>
                      </div>
                      <span onClick={self.removeMeaning(current)} id="delete-box">[Delete]</span>
                    </div>
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
