const mysql = require('mysql');
const connection = require('../db/db.js');

class dbHandler{

	dbHandler(){
	
	};
	
	addNewUser(data,callback){
		
		let sql = 'INSERT INTO usersdb.users (username, password, email)VALUES (\''+data.usrname+'\',\''+data.password+'\',\''+data.email+'\');'
		
		connection.query(sql,function(err,results,fields){

			
			if(results.length==0) return callback('No changes made in db!');

			return callback(null,results);
		});
		
	};
	
	checkPassword(data,callback){
		
		const sql = 'SELECT * FROM usersdb.users WHERE users.password = "'+data+'";';
		
		connection.query(sql,function(err,results,fields){
		
		if(results.length == 0) return callback('Wrong password');
		
		return callback(null,results);
		
		});
	};
	
	collectCoins(data,callback){
		console.log(data);
		const sql = 'UPDATE usersdb.users SET hearts = hearts + (SELECT SUM(likes) FROM usersdb.ads WHERE users.iduser='+data+' AND users.iduser = ads.iduser AND ads.active = 1) WHERE users.iduser='+data+';';
		
		connection.query(sql,function(err,results,fields){
			
			if(results.length == 0) return callback('Error collecting coins!');
			
			return callback(null,results);
			
		});
		
	};
	
	deactAd(data,callback){
		
		const sql = 'UPDATE usersdb.ads SET active = 0 WHERE ads.iduser = '+data+' AND ads.active = 1;';
		
		connection.query(sql,function(err,results,fields){
			
			if(results.lentgh ==0) return callback('Error deactivation ad!');
			
			return callback(null,results);
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
			
			return callback(null,results);
			
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
	
	likeAd(data,userid,callback){
		
		if(data==null) return callback('Invalid like input!');
		
		const sql = "INSERT INTO usersdb.likes (amount,userid,adsid)VALUES ("+data.amount+", "+userid+","+data.id+");"
			
		connection.query(sql,function(err,results,fields){
				
				if(err){
					
					return callback({'message' : 'something is wrong with liking 1'});
					
				}
				
				return callback(null,results);
				
		});
	};
	
	updateLikes(data,callback){
		
		const sql = "UPDATE usersdb.ads SET likes = likes + "+data.amount+" WHERE idad = "+data.id+";";
		
		connection.query(sql,function(err,results,fields){
			
			if(err){
				
				return callback({'message' : 'something is wrong with liking 2'});
			
			}
			
		return callback(null,{"title" : "Thank you!","message" : "you donated "+data.amount});

		});
	};
};

module.exports = new dbHandler();
