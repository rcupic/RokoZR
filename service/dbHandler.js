const mysql = require('mysql');
const connection = require('../db/db.js');

class dbHandler{

	dbHandler(){
	
	};
	//REGISTRATION---------------------------------------------------------------------------------------------------------
	checkForName(data,callback){//FIRST CHECK IN REGISTRATION
		
		if(data==null) return callback('Reading name from db error!');
		
		let sql = "SELECT * FROM usersdb.users WHERE usersdb.users.username =" + "'"+data+"'";
	
		connection.query(sql,function(err,results,fields){

			if(results.length!=0) return callback('Username is in use!');
			
			return callback(null,results);
			
		});
	};
	
	checkForMail(data,callback){//SECOND CHECK IN REGISTRATION
		
		if(data == null) return callback('Wrong mail input!');
		
		let sql = "SELECT iduser FROM usersdb.users WHERE usersdb.users.email='"+data+"'";
		
		connection.query(sql,function(err,results,fields){

			
			if(results.length!=0) return callback('Mail is in use!');

			return callback(null);
		});
	};
	
	addNewUser(data,callback){//FINALIZE REGISTRATION OF NEW USER
		
		let sql = 'INSERT INTO usersdb.users (username, password, email)VALUES (\''+data.usrname+'\',\''+data.password+'\',\''+data.email+'\');'
		
		connection.query(sql,function(err,results,fields){

			
			if(results.length==0) return callback('No changes made in db!');

			return callback(null,results);
		});
		
	};
	//---------------------------------------------------------------------------------------------------------
	checkLogIn(data,callback){//CHECKING FOR LOG IN

		const sql = "SELECT * FROM usersdb.users WHERE usersdb.users.username ='"+data.name+"' && usersdb.users.password='"+data.pass+"';";
		
		connection.query(sql,function(err,results,fields){
		
		if(results.length){
			
			const stringRes = JSON.parse(JSON.stringify(results));//PARSING RESULTS FOR EASIER HANDLING
			return callback(null,stringRes[0].iduser);
			
		}else{
			
			return callback('No such user!');
			
		}
		});
	};
	//COLLECTING AD---------------------------------------------------------------------------------------------------------
	checkPassword(data,callback){//CHECKING PASSWORD FOR COLLECTING MONEY
		
		const sql = 'SELECT * FROM usersdb.users WHERE users.password = "'+data+'";';
		
		connection.query(sql,function(err,results,fields){
		
		if(results.length == 0) return callback('Wrong password');
		
		return callback(null,results);
		
		});
	};
	
	collectCoins(data,callback){//COLLECTING MONEY---HEARTS GO MINUS
		
		const sql = 'UPDATE usersdb.users SET hearts = hearts  - (SELECT SUM(likes) FROM usersdb.ads WHERE users.iduser='+data+' AND users.iduser = ads.iduser AND ads.active = 1) WHERE users.iduser='+data+';';
		
		connection.query(sql,function(err,results,fields){
			
			if(results.length == 0) return callback('Error collecting coins!');
			
			return callback(null,results);
			
		});
		
	};
	
	deactAd(data,callback){//AFTER COLLECTING DEACTIVATION OF AD
		
		const sql = 'UPDATE usersdb.ads SET active = 0 WHERE ads.iduser = '+data+' AND ads.active = 1;';
		
		connection.query(sql,function(err,results,fields){
			
			if(results.lentgh ==0) return callback('Error deactivation ad!');
			
			return callback(null,results);
		});
		
	};
	//LIKING AD---------------------------------------------------------------------------------------------------------
	searchAd(data,callback){//SEARCHING AD FOR LIKING
		
		if(data==null) return callback('Invalid search input!');
		
		const sql = "SELECT * FROM usersdb.ads,usersdb.users WHERE active='1' AND ads.name='"+data.name+"' AND ads.iduser = users.iduser AND users.iduser != "+data.id+"";
		
		connection.query(sql,function(err,results,fields){
				
			if(results.length==0) return callback(null,results);
			
			return callback(null,JSON.parse(JSON.stringify(results)));

		});
		
	};
	
	insertLike(data,callback){//LIKING AD--ADDING TO TABLE OF LIKES
		
		if(data==null) return callback('Invalid like input!');
		
		const sql = "INSERT INTO usersdb.likes (amount,userid,adsid)VALUES ("+data.amount+", "+data.id+","+data.selected+");"
			
		connection.query(sql,function(err,results,fields){
				
				if(err){
					
					return callback({'message' : 'something is wrong with liking 1'});
					
				}
				
				return callback(null,results);
				
		});
	};
	
	updateLikes(data,callback){//ADDING LIKES TO SELECTED AD
		
		const sql = "UPDATE usersdb.ads SET likes = likes + "+data.amount+" WHERE idad = "+data.selected+";";
		
		connection.query(sql,function(err,results,fields){
			
			if(err){
				
				return callback({'message' : 'something is wrong with liking 2'});
			
			}
			
			return callback(null,{"title" : "Thank you!","message" : "you donated "+data.amount});

		});
	};
	
	likeAd(data,callback){//LIKING AD--HEARTS GO PLUS
		
		const sql = 'UPDATE usersdb.users SET hearts = hearts  + '+data.amount+' WHERE users.iduser = '+data.id+';';
		
		connection.query(sql,function(err,results,fields){
			
			if(results.length == 0) return callback('Error collecting coins!');
			
			return callback(null,results);
			
		});
		
	};	
	//---------------------------------------------------------------------------------------------------------
	searchForUser(data,callback){//SEARCHING USER INFORMATIONS FROM SECURE PAGE
		
		const sql = "SELECT * FROM usersdb.users WHERE users.iduser = "+data+";";
		
		connection.query(sql,function(err,results,fields){
			
			if(err){
				
				return callback({'message' : 'Error in searchForUser'});
			
			}
			
			return callback(null,JSON.parse(JSON.stringify(results)));

		});
	};
	//---------------------------------------------------------------------------------------------------------
};

module.exports = new dbHandler();
