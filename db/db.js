const mysql = require('mysql');

//DATABASE INFORMATIONS
const servername = "localhost";
const username = "root";
const paswrd = "roko";
const db= "usersdb";
	
	
//CONNECTION CONFIGURATION
	const connection = mysql.createConnection({
		
		host: servername,
		user: username,
		password: paswrd,
		database: db,
		
	})
	
//OPENING CONNECTION
	connection.connect(function(err,result) {
		
		if (err) {
			
			return err.stack;
			
		}
		
		return result;
		
	});

module.exports = connection;