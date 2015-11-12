// this file simply requires all other files in this directory
// that you want to use to run migrations on the DB. If you add
// a new migrations/*.js file you must manually include it here.
var mysql = require( 'mysql' );
var database = require( '../utils/database' );

var migrations = 
[
	//require( './create_users_table' )
	require( './add_created_at_column_to_tbl_users' )
];

// loop through each migration file and apply to DB
for( idx in migrations )
{
	database.query( migrations[idx].sql, ( err, rows, fields ) =>
	{
		if( err )
		{
			console.log( err );
			return;
		}
		
		console.log( 'successful migration' );
	});
}