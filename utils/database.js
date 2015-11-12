var mysql = require( 'mysql' );

var DB = 
{
	get_connection : function()
	{
		return mysql.createConnection( 
			process.env.CLEARDB_DATABASE_URL ||
			{
				host : 'localhost',
				port : 3306,
				user : 'root',
				database : 'test'
			}
		);
	},
	query : function(sql, callback)
	{
		var conn = this.get_connection();
		
		conn.connect();
		conn.query( sql, callback );
		conn.end();
	}
};



module.exports = DB;