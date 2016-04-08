var React = require('react');

var MeaningsList = require('./MeaningsList.jsx');

module.exports = React.createClass({

  createMeaning: function() {

  },
  render: function() {
    //entry = this.props.entry;
    //check if the array is empty
    
    if (true){//entry.meanings.length > 0) {
      return (
        <div>
            <button onClick={this.createMeaning}>Add Meaning</button>
            <MeaningsList addMeaning={this.props.addMeaning} parentPath={this.props.parentPath}/>
        </div>
      );
    } else {
      return (
        <button onClick={this.createMeaning}>Add Meaning</button>
      );
    }
  }
});



























/*


*/
