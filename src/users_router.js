var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var database = require( '../utils/database' );
var router = express.Router();

router.use( bodyParser.json() );

/*
 * Get all users
 */
router.get( '/', ( req, res ) => {
	database.query( 'SELECT * FROM tbl_users',
		( err, rows, fields ) => {
			if ( err ) {
				res.status( 400 ).send( err );
				return;
			}

			res.send( rows );
		}
	);
} );

/*
 * Get a specific user specified by id
 * @Param id the id of the user to retreive REQUIRED
 */
router.get( '/:id', ( req, res ) => {
	database.query( `SELECT * FROM tbl_users WHERE id=${req.params.id}`,
		( err, rows, fields ) => {
			if ( err ) {
				res.status( 400 ).send( err );
				return;
			}

			if ( rows.length < 1 ) {
				res.sendStatus( 204 );
				return;
			}

			res.send( rows[ 0 ] );
		}
	);

} );

/*
 * Create a user
 * @Param user
 * {
 *    "name" : REQUIRED STRING,
 *    "role" : REQUIRED STRING
 * }
 */

router.post( '/', ( req, res ) => {
	var sql = createUserQueryString( req.body );

	if ( !sql ) {
		res.status( 400 ).send( 'missing field' );
		return;
	}

	database.query( sql, ( err, rows, fields ) => {
		if ( err ) {
			res.status( 400 ).send( err );
			return;
		}

		res.send( rows );
	} );
} );

/*
 * Delete a specific user identified by name and role (Optional)
 * @Param user
 * {
 *    "name" : REQUIRED STRING,
 *    "role" : STRING
 * }
 */

router.delete( '/', ( req, res ) => {
	var sql = deleteUserQueryString( req.body );

	if ( !sql ) {
		res.status( 400 ).send( 'missing required field' );
		return;
	}

	database.query( sql, ( err, rows, fields ) => {
		if ( err ) {
			res.status( 400 ).send( err );
			return;
		}

		res.send( rows );
	} );
} );


function createUserQueryString ( user ) {
	if ( !user.name || !user.role ) {
		// name and role are required
		return;
	}

	return `INSERT INTO tbl_users (name, role) values ( \"${user.name}\", \"${user.role}\" )`;
}

function deleteUserQueryString ( user ) {
	var sql = 'DELETE FROM tbl_users ';

	if ( !user.name ) {
		// if name is not provided don't do anything
		return;
	}

	sql += `WHERE name=\"${user.name}\" `;

	if ( user.role ) {
		sql += `AND role=\"${user.role}\"`;
	}

	return sql;
}

module.exports = router;
