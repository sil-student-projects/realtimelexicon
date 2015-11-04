var MyBox = React.createClass({
  getInitialState: function() {
    return {text: "I am initial state"};
  },
  /*
  componentWillMount: function() {
    this.setState({text: "componentWillMount set the state"});
  },
  */
  edit: function() {
    var val = this.refs.thebox.getDOMNode().value;
    this.setState({text: val});
  },
  render: function() {
    var text = this.state.text
    return (
      <div>
        <textarea ref="thebox"> enter something to change the state </textarea>
        <button onClick={this.edit}> Edit State </button>
        <br/>
        <div ref="results"> {text} </div>
      </div>
    );
  }
});


React.render(<MyBox>I am the child of MyBox</MyBox>,
    document.getElementById('react-container'));
