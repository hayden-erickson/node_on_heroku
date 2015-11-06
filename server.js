var express = require( 'express' );
var app = express();

app.get( '/', (req, res) => 
{
	res.send( "hello dude!" );
});

app.listen( 6060, ()=> console.log( 'app is listening on 6060' ) );
