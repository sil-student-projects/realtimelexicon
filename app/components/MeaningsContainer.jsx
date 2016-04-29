/***************************************************************************
  This component will be loaded for a specific Entry. Each Entry will
  have different meanings, and this is the component that displays them.

  The Entry component handles adding new meanings, so this container simply
  needs to be able to update and delete meanings.
***************************************************************************/

var React = require('react');


module.exports = React.createClass({
  updateMeaning: function(e) {
    //the id of each meaning input is set during the render function
    var key = e.target.id;
    var meaning = this.props.meanings[key];

    //the value which the meaning should now have
    var value = e.target.value;

    var self = this;
    //the key of the entry that this meaning is for is always the first element in the path
    var entryKey = meaning.path[0];

    //use a copy of the meanings path instead of the original path
    var copyOfMeaningPath = meaning.path.slice();

    //the path already points to the correct meaning object, so push "meaning"
    //onto the end of the array to point at the meanings "meaning" string
    copyOfMeaningPath.push("meaning");

    //the operations being submitted will be on the entire string, so push a 0
    //index onto the end of the array to point at the beginning of the string
    copyOfMeaningPath.push(0);

    //create an array of 2 operations to submit to the server in order
    var ops = [];
    //first, delete the entire meaning that is currently there
    ops.push({p: copyOfMeaningPath, sd: meaning.meaning});
    //second insert the meaning that needs to be there
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
    //the key of the entry that this meaning is for is always the first element in the path
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
    //use indicator to see if there are any meanings in the word yet and render appropriately
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
