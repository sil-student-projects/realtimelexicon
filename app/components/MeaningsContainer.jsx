var React = require('react');


module.exports = React.createClass({
  updateMeaning: function(e) {
    var key = e.target.id;
    var meaning = this.props.meanings[key];
    var value = e.target.value;

    var self = this;
    var entryKey = meaning.path[0];

    var copyOfMeaningPath = JSON.parse(JSON.stringify(meaning.path));
    copyOfMeaningPath.push("meaning");
    copyOfMeaningPath.push(0);

    var ops = [];
    ops.push({p: copyOfMeaningPath, sd: meaning.meaning});
    ops.push({p: copyOfMeaningPath, si: value});

    this.props.doc.submitOp(ops, function() {
      self.setState({
        entry: self.props.doc.data[entryKey]
      });
    });
  },
  removeMeaning: function(key) {
    var self = this;
    var meaning = this.props.meanings[key];
    var entryKey = meaning.path[0];
    var doc = self.props.doc;
    return (function() {
      doc.submitOp([{p: meaning.path, od: meaning}], function() {
        self.setState({
          entry: doc.data[entryKey]
        });
      });
    });
  },
  render: function() {
    var meanings = this.props.meanings;
    var indicator = false;
    var doc = this.props.doc;
    for (var prop in meanings) {
      indicator = true;
      break;
    }
    if (indicator) {
      var self = this;
      return (
        <div onChange={self.updateMeaning}>
            {
              Object.keys(meanings).map(function(key, index) {
                return (
                  <div key={"meaning"+index}>
                    <div className="sil-input">
                      <div className="input-group">
                          <span className="input-group-addon" id="basic-addon1">Meaning</span>
                          <input type="text" className="form-control" aria-describedby="basic-addon1" id={key} value={meanings[key].meaning} placeholder="Enter Meaning" defaultValue=""></input>
                      </div>
                      <span onClick={self.removeMeaning(key)} id="delete-box">[Delete]</span>
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
          <h3>No Meanings yet!</h3>
        </div>
      );
    }
  }
});
