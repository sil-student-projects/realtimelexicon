var MyBox = React.createClass({
  /* getInitialState: function() {
    return {stuff: "I am initial state"};
  },*/
  componentWillMount: function() {
    this.setState({stuff: "componentWillMount set the state"});
  },
  edit: function() {
    var val = this.refs.thebox.getDOMNode().value;
    this.setState({stuff: val});
  },
  render: function() {
    var stuff = this.state.stuff
    console.log(stuff);
    return (
      <div>
        <textarea ref="thebox">
        enter something to change the state
        </textarea>
        <button onClick={this.edit}>
        Edit
        </button>
      </div>
    );
  }
});


React.render(<MyBox>I am the child of MyBox</MyBox>,
    document.getElementById('react-container'));
