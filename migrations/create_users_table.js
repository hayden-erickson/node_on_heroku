var create_users_table = 
{
	table : 'tbl_users',
	sql : `CREATE TABLE tbl_users( 
		id int not null AUTO_INCREMENT, 
		name varchar(50) not null, 
		role varchar(50), 
		PRIMARY KEY( id ) 
	);`
}

module.exports = create_users_table;