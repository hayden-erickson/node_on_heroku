var express = require( 'express' );
var mysql = require( 'mysql' );
var app = express();

// process.env.CLEARDB_DATABASE_URL = 'mysql://b77c30db375262:753745bf@us-cdbr-iron-east-03.cleardb.net/heroku_21257787c1a539d?reconnect=true';

var connection = mysql.createConnection( 
	process.env.CLEARDB_DATABASE_URL ||
	{
		host : 'localhost',
		port : 3306,
		user : 'root',
		database : 'test'
	}
);
	
	
app.get( '/', (req, res) => 
{
	connection.connect( (err) => 
	{
		if( err )
		{		
			res.send( err.stack );
			return;
		}
		
		console.log( 'connection to DB successful' );
	});
	
	connection.query( 'SELECT * FROM tbl_users;', 
		function( err, rows, fields )
		{
			if( err ) 
			{
				res.send( err );
				return;
			}
			
			res.send( rows[0] );
		}
	);
	
	connection.end();
	
});

var port = process.env.PORT || 6060;

app.listen( port, ()=> console.log( `app is listening on port ${port}` ) );


