var express = require( 'express' );
var usersRouter = require( './src/users_router' );

var app = express();
app.use( express.static( 'app' ) );

// routers
app.use( '/users', usersRouter );

var port = process.env.PORT || 6060;

app.listen( port, ()=> console.log( `app is listening on port ${port}` ) );
