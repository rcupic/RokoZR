const mysql = require('mysql');
const connection = require('../db/db.js');

class dbHandler{

	dbHandler(){
	
	};
	
	addNewUser(data,callback){
		
		let sql = 'INSERT INTO usersdb.users (username, password, email)VALUES (\''+data.usrname+'\',\''+data.password+'\',\''+data.email+'\');'
		
		connection.query(sql,function(err,results,fields){

			
			if(results==0) return callback('No changes made in db!');

			return callback(null);
		});
		
	};
	
	checkForMail(data,callback){
		
		if(data == null) return callback('Wrong mail input!');
		
		let sql = "SELECT iduser FROM usersdb.users WHERE usersdb.users.email='"+data+"'";
		
		connection.query(sql,function(err,results,fields){

			
			if(results.length!=0) return callback('Mail is in use!');

			return callback(null);
		});
	};
	
	checkForName(data,callback){
		
		if(data==null) return callback('Reading name from db error!');
		
		let sql = "SELECT * FROM usersdb.users WHERE usersdb.users.username =" + "'"+data+"'";
	
		connection.query(sql,function(err,results,fields){

			if(results.length!=0) return callback('Username is in use!');
			
			return callback(null);
			
		});
	};
	
	searchAd(data,callback){
		
		if(data==null) return callback('Invalid search input!');
		
		const sql = "SELECT * FROM usersdb.ads WHERE active='1' AND ads.name='"+data+"'";
		
		connection.query(sql,function(err,results,fields){
				
			if(results.length==0) return callback('No such AD!');
			
			return callback(null,JSON.parse(JSON.stringify(results)));

		});
		
	};

};

module.exports = new dbHandler();