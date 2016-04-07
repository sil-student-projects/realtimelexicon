var React = require('react');

var AddMeaningForm = require('./AddMeaningForm.jsx');

module.exports = React.createClass({
  render: function() {
    var entry = this.props.entry;
    var output = JSON.stringify(entry);
    return (
      <div>
        <div>{output}</div>
        <AddMeaningForm parentPath={entry ? entry.path : []} />
      </div>
    );
  }
});
