var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return ({
      newEntry: ''
    });
  },
  updateNewEntry: function(e) {
    this.setState({
      newEntry: e.target.value
    });
  },
  handleAddNew: function() {
    this.props.addEntry(this.state.newEntry);
    this.setState({
      newEntry: ''
    });
  },
  render: function() {
    return (
      <div>
          <input type="text" value={this.state.newEntry} onChange={this.updateNewEntry}/>
          <button onClick={this.handleAddNew}>Add Entry</button>
      </div>
    );
  }
});
