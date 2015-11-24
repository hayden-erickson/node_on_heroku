var qs = require( 'querystring' );
var React = require( 'react' );
var ReactDOM = require( 'react-dom' );
var clientSecret = {
	verifyTokenUri: 'https://www.googleapis.com/oauth2/v1/tokeninfo',
	web: {
		clientId: '238563924363-fgdc0ea3pub9a28otusqqf7sdb17efab.apps.googleusercontent.com',
		authUri: 'https://accounts.google.com/o/oauth2/auth',
		tokenUri: 'https://accounts.google.com/o/oauth2/token',
		authProviderx509CertUrl: 'https://www.googleapis.com/oauth2/v1/certs',
		clientSecret: 'o2Z2k3tXBsyZ8c95Vp_nRDfW',
		redirectUris: [
			'https://murmuring-river-7363.herokuapp.com',
			'http://localhost:6060',
		],
	},
};


/*const hashToToken = ( hash ) => {
	if ( hash.substring( 1 ).length === 0 ) {
		return;
	}

	var token = qs.decode( hash.substring( 1 ) );

	if ( token.error ) {
		console.error( token.error );
		return;
	}

	return token;
};*/

const grabToken = ( e ) => {
	e.preventDefault();

	var oauthUrl = clientSecret.web.authUri + '?' + qs.encode(
		{
			response_type: 'token',
			client_id: clientSecret.web.clientId,
			redirect_uri: clientSecret.web.redirectUris[ 0 ],
			scope: 'email profile',
		}
	);

	// console.log( oauthUrl );
	window.location = oauthUrl;
};

const verifyToken = ( props ) => {

	if ( props.verified ) {
		return;
	}

	var req = new XMLHttpRequest();
	req.open( 'GET', clientSecret.verifyTokenUri + '?access_token=' + props.token.accessToken );

	req.onreadystatechange = () => {

		if ( req.readyState !== XMLHttpRequest.DONE ) return;

		if ( req.status === 400 ) {
			console.error( JSON.parse( req.response ).error_description );
			return; // set button to red
		}

		// if ( req.status === 200 ) // set button to green;

		// audience of token must match client id from developers console in google
		if ( !clientSecret.web.clientId.match( JSON.parse( req.response ).audience ) ) {
			console.error( 'this token is intended for someone else' );
			return;
		}

		console.log( 'success!' );
		props.setVerified( true );
	};

	req.send();

	console.log( 'loading...' );
};


var Token = React.createClass( {
	render: () => (
		<div className='container'>

			<div className='row'>
				<div className='col-md-12'>
					<h1>Get Token</h1>
				</div>
			</div>

			<div className='row'>
				<div className='col-md-4'>
					<button className='btn btn-default' onClick={grabToken}>Get My Token From Google</button>
				</div>
			</div>
		</div>
	),
} );

ReactDOM.render(
	<Token />,
	document.getElementById( 'content' )
);
