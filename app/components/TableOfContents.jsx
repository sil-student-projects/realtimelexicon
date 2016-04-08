var React = require('react');

module.exports = React.createClass({
  render: function() {
    var self = this;
    var entries = self.props.entries;
    return (
      <div id="table-of-contents">
      {
      Object.keys(entries).map(function(current, index) {
          return (
            <div key={"entry"+index}>
              <div onClick={self.props.select(entries[current].word)} className="line">{entries[current].word}</div>
              <button onClick={self.props.remove(current)} className="line">delete</button>
              <br/>
            </div>
          );
        })
      }
      </div>
    )
  }
});
