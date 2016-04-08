var React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return ({
      newMeaning: ''
    });
  },
  updateNewMeaning: function(e) {
    this.setState({
      newMeaning: e.target.value
    });
  },
  handleAddNew: function() {
    this.props.addMeaning(this.state.newMeaning, this.props.parentPath);
    this.setState({
      newMeaning: ''
    });
  },
  render: function() {
    return (
      <div>
          Insert a meaning with the parentPath of {JSON.stringify(this.props.parentPath)}
          <input type="text" value={this.state.newMeaning} onChange={this.updateNewMeaning}/>
          <button onClick={this.handleAddNew}>Add Meaning</button>
      </div>
    );
  }
});
