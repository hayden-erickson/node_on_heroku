var qs = require('querystring');
var React = require('react');
var ReactDOM = require('react-dom');
var client_secret =
{
	web : 
	{
		client_id : "238563924363-fgdc0ea3pub9a28otusqqf7sdb17efab.apps.googleusercontent.com",
		auth_uri : "https://accounts.google.com/o/oauth2/auth",
		token_uri : "https://accounts.google.com/o/oauth2/token",
		auth_provider_x509_cert_url : "https://www.googleapis.com/oauth2/v1/certs",
		client_secret : "o2Z2k3tXBsyZ8c95Vp_nRDfW",
		redirect_uris :
		[
			"https://murmuring-river-7363.herokuapp.com"
		]	
	}
};


var FormInput = React.createClass(
{
	handleSubmit : function(e)
	{
		e.preventDefault();
		var oauth_url =  client_secret.web.auth_uri +'?'+ qs.encode(
		{
			response_type : 'token',
			client_id : client_secret.web.client_id,
			redirect_uri : client_secret.web.redirect_uris[0],
			scope : "email profile"
		});
		
		var request = new XMLHttpRequest();
		request.open( "GET", oauth_url );
		request.send();
		
		console.log( oauth_url );
	},
	render : function()
	{
		return (
			<form role="form" className="form-verticle" onSubmit={this.handleSubmit}>
				<input ref="email" type="text" className="form-control" placeholder="Enter email"  /><br/>
				<input ref="password" type="password" className="form-control" placeholder="Enter password" /><br/>
				<button className="btn btn-default" >Get My Stuff From Google</button>
			</form>
		);
	}
});

var TokenBox = React.createClass(
{
	render : function()
	{
		return (
			<div className="form-group">
				<textarea className="form-control" value={this.props.token} />
				<button className="btn btn-default" onClick={this.props.reset}>Reset</button>
			</div>
		);
	}
});


var Token = React.createClass(
{
	getInitialState : function()
	{
		return { email : "", password : "", token : null };
	},
	emptyToken : function()
	{
		this.setState( { token : null } );
	},
	render : function()
	{
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h1>{ this.state.token ? "Got Your Token" : "Get Token"}</h1>
					</div>
				</div>
				<div className="row">
					<div className="col-md-4">
					{ 
						this.state.token ? 
							<TokenBox token={this.state.token} reset={this.emptyToken} /> : 
							<FormInput /> 
					}
					</div>
				</div>
			</div>
		);
	}
});

ReactDOM.render(
	<Token />,
	document.getElementById( 'content' )
)