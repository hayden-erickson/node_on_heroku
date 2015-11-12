var express = require( 'express' );
var users_router = require( './src/users_router' );

var app = express();
app.use( express.static( 'app' ) );

app.get( '/', (req, res) =>
{
	res.redirect( 'html' );
});

// routers
app.use( '/users', users_router );

var port = process.env.PORT || 6060;

app.listen( port, ()=> console.log( `app is listening on port ${port}` ) );