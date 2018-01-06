var mysql = require('mysql');

//DATABASE INFORMATIONS
	var servername = "localhost";
	var username = "root";
	var paswrd = "roko";
	var db= "usersdb";
	
	
//CONNECTION CONFIGURATION
	var connection = mysql.createConnection({
		
		host: servername,
		user: username,
		password: paswrd,
		database: db,
		
	})
	
//OPENING CONNECTION
	connection.connect(function(err,result) {
		
		if (err) {
			
			console.error('error connecting: ' + err.stack);
			return err.stack;
			
		}
		
		return result;
		
	});

module.exports = connection;