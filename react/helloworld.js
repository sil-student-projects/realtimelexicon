// I, Spencer Smith, have commented this code from a React Tutorial!
// It is close to what we are looking for. Use it for understanding.
// To run it, use this JSFiddle:
// https://jsfiddle.net/6rhdpt5c/91/

//////////////////////////////////////////////////////

//Parent Component
//This is the Container for the Parent Component.
//Here we instantiate the State using getInitialState.
var FriendsContainer = React.createClass({
    getInitialState: function(){
      return {
        name: 'Tyler McGinnis',
        friends: ['Jake Lingwall', 'Murphy Randall', 'Merrick Christensen'],
      }
    },

    //This is an addFriend function that allows us to add something
    //to the "friends" array in the actual state. We just push the friend
    //that is passed in to the array and then set the state of friends to
    //this.state.friends.
    addFriend: function(friend){
      this.state.friends.push(friend);
      this.setState({
        friends: this.state.friends
      });

    },

    //This tells it how to render. So we render it in a div. The name
    //is a <h3> and we put in this.state.name. Then we have an AddFriend
    //component. The addNew data is set to this.addFriend.
    render: function(){
      return (
        <div>
          <h3> Name: {this.state.name} </h3>
          <AddFriend addNew={this.addFriend} />
          <ShowList names={this.state.friends} />
        </div>
      )
    }
}); // Parent Component Ends Here.

//////////////////////////////////////////////////////

// The AddFriend Component.
//////////////////////////////////////////////////////

//This one populates the input box.
var AddFriend = React.createClass({
  getInitialState: function(){
    return {
      newFriend: ''
    }
  },

  //This one sets the State uponChange of the input box.
  //It does not update the UI. Just the State.
  updateNewFriend: function(e){
    this.setState({
      newFriend: e.target.value
    });
  },

  //This one adds a new prop and it uses what is in the input box.
  //Next it clears the input box! That's all.
  handleAddNew: function(){
    this.props.addNew(this.state.newFriend);
    this.setState({
      newFriend: ''
    });
  },


  //This one tells us to some stuff inside a div. Inside we want an input
  //box and a button. The original value is set by newFriend which is set
  //in the getInitialState method above. Then onChange it will call the
  //updateNewFriend function. The button onClick will call the handleAddNew
  //function.
  render: function(){
    return (
        <div>
          <input type="text" value={this.state.newFriend} onChange={this.updateNewFriend} />
          <button onClick={this.handleAddNew}> Add Friend </button>
        </div>
    );
  }
});
//////////////////////////////////////////////////////

// The ShowList Component.
//////////////////////////////////////////////////////

//This will render our list. Basically, it stores the results of a .map
//function call into a variable called listItems. This map changes
//every element in the names array in the parent props into a list item.
//Then we render an <h3> showing friends, then a bulletted list of those
//names that are now in the listItems array.
var ShowList = React.createClass({
  render: function(){
    var listItems = this.props.names.map(function(friend){
      return <li> {friend} </li>;
    });
    return (
        <div>
          <h3> Friends </h3>
          <ul>
            {listItems}
          </ul>
        </div>
    )
  }
});//end ShowList

//////////////////////////////////////////////////////


// Render Parent Component - this Parent contains AddFriend and Showlist.
// Rendering the parent will render all components within.

ReactDOM.render(
  <FriendsContainer/>,
  document.getElementById('app')
);
