var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        Put an input and button here for adding a meaning with a parentPath of {this.props.parentPath}
      </div>
    );
  }
});
