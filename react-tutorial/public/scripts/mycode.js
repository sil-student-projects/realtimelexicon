var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentDelete: function(commentID) {
    $.ajax({
      url: this.props.remove,
      dataType: 'json',
      type: 'POST',
      data: {"id": commentID},
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render : function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} onCommentDelete={this.handleCommentDelete}/>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

var DeleteButton = React.createClass({
  render: function() {
    var del = this.props.del;
    var id = this.props.commentID;
    return (
      <button onClick={del.bind(this, id)}>Delete Above Comment</button>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var anger = this.props.onCommentDelete;
    var commentNodes = this.props.data.map(function(comment){
      return (
        <div>
          <Comment author={comment.author} key={comment.id}>
            {comment.text + " EXTRA: " + comment.extra}
          </Comment>
          <DeleteButton del={anger} commentID={comment.id} />
        </div>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  getInitialState: function() {
    return {
      author: '',
      text: '',
      extra: ''
    };
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleExtraChange: function(e) {
    this.setState({extra: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    var extra = this.state.extra.trim();
    if (!text || !author || !extra) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text, extra: extra});
    this.setState({author: '', text: '', extra: ''});
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input
          type="text"
          placeholder="Extra stuff?"
          value={this.state.extra}
          onChange={this.handleExtraChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

var Comment = React.createClass({
  rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return {__html: rawMarkup};
  },
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox url="/api/comments" remove="/api/delete" pollInterval={2000}/>,
  document.getElementById('content')
);
