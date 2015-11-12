var React = require('react');
var ReactDOM = require('react-dom');

var CommentBox = React.createClass(
{
	render : function()
	{
		return (
			<div className="commentBox">
				Hello, I'm a comment box
			</div>
		);
	}
});

ReactDOM.render(
	<CommentBox />
)