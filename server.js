var express = require( 'express' );
var mysql = require( 'mysql' );
var app = express();

app.get( '/', (req, res) => 
{	
	var connection = mysql.createConnection( 
		process.env.CLEARDB_DATABASE_URL ||
		{
			host : 'localhost',
			port : 3306,
			user : 'root',
			database : 'test'
		}
	);
	
	connection.connect();
	
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


