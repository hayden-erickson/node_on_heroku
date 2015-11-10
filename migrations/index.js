// this file simply requires all other files in this directory
// that you want to use to run migrations on the DB. If you add
// a new migrations/*.js file you must manually include it here.
var mysql = require( 'mysql' );

var connection = mysql.createConnection(
	process.env.CLEARDB_DATABASE_URL ||
	{
		host : 'localhost',
		port : 3306,
		user : 'root',
		database : 'test'
	}
);

var migrations = 
[
	require( './create_users_table' ),
	require( './add_user_to_users' )
];

connection.connect( (err) =>
{
	if( err ) console.log( err.stack );
});

for( idx in migrations )
{
	connection.query( migrations[idx].sql, handle_migration_error );
}

function handle_migration_error( err, rows, fields )
{
	if( err )
	{
		console.log( err );
		return;
	}
	
	console.log( 'success migration' );
}

connection.end();
