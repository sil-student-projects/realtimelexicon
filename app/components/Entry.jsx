var React = require('react');

var MeaningsContainer = require('./MeaningsContainer.jsx');

module.exports = React.createClass({

  addMeaning: function(def, parPath) {
    var self = this;
    var doc = this.props.doc;
    //console.log((doc.data[parPath].meanings).length);
    var arrayPosition = (doc.data[parPath].meanings).length;
    console.log("arr:", arrayPosition);
    var newPath = parPath.slice();

    //This should dynamically generate the path.
    newPath.push("meanings");
    newPath.push(arrayPosition);

    var ins_obj = {meaning: def, path: newPath};
    doc.submitOp([{p: newPath, li: ins_obj}], function() {
      self.setState({
        entries: doc.data
      });
    });
  },

  render: function() {
    var entry = this.props.entry;
    if (entry) {
      return (
        <div>
          <div>{entry.word}</div>
          <MeaningsContainer addMeaning={this.addMeaning} entry={this.props.entry} parentPath={this.props.parentPath}/>
        </div>
      );
    } else {
        return(<div>No Word Yet!</div>);
    }
  }
});
