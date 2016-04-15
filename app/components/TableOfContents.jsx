var React = require('react');

module.exports = React.createClass({
  render: function() {
    var self = this;
    var entries = self.props.entries;
    return (
      <div id="table-of-contents">
          {
          Object.keys(entries).map(function(current, index) {
              if(typeof(entries[current]) !== "string") {
                return (
                  <div key={"entry"+index}>
                    <ul className="nav nav-sidebar" id="line">
                      <div onClick={self.props.select(current)} id="word" className="line"><li><a>{entries[current].word}</a></li></div>
                      <div onClick={self.props.remove(current)} id="delete" className="line">[Delete]</div>
                    </ul>
                    <br/>
                  </div>
                );
              }
            })
          }

      </div>
    )
  }
});
