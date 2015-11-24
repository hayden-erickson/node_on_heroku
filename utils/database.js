var mysql = require( 'mysql' );

var DB = {
	query: ( sql, callback ) => {
		var conn = mysql.createConnection( process.env.DATABASE_URL );

		conn.connect();
		conn.query( sql, callback );
		conn.end();
	},
};

module.exports = DB;
