var express = require( 'express' );
var mysql = require( 'mysql' );
var app = express();

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
	connection.connect();
	
	connection.query( 'SELECT * FROM tbl_users;', 
		function( err, rows, fields )
		{
			if( err ) 
			{
				res.send( 'error: ' + err );
				return;
			}
			
			res.send( 'rows: ' + JSON.stringify( rows[0] ) );
		}
	);
	
	connection.end();
	
});

app.listen( 6060, ()=> console.log( 'app is listening on 6060' ) );


