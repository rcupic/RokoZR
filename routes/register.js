const express=require('express');
const router = express.Router();
const connection = require('../db/db.js');
const accountant = require('../service/accountant.js');
		
/* GET register page. */
router.get('/',function(req,res,next){
	
	res.render('register');
	
});

/*SHOULD CALL AFTER REGISTER INPUT*/
router.post('/',function(req,res,next){
	
	let flag = 0;
	
	//CHECKING IF USERNAME IS HAVING ILLEGAL CHAR
	accountant.checkIllegalChar(req.uname,callback(err,result){
		
		if(err){
			
			res.status(500).json({err});
			return;
			
		}
		
	});

	//CHECKING IF PASSWORD IS HAVING SPACE	
	for(let i=0;i<psw.length;i++){
		if(i==0)flag++;
			if(psw[i]==' '){
			
			flag = 10;
			
			}
	}	
	
	//FINALLY WE ARE CHECKING DATABASE FOR SAME INPUTS
	//PASSWORD CAN BE SAME IT DOESNT MATTER
	
	let sql = "SELECT * FROM usersdb.users WHERE usersdb.users.username =" + "'"+uname+"'";
	
	connection.query(sql,function(err,results,fields){
		finish(flag);
		flag++;
		const checkName = results.length;	
		if(checkName!=0)flag=15;
		finish(flag);
	});
	
	sql = "SELECT iduser FROM usersdb.users WHERE usersdb.users.email='"+mail+"'";
		
	connection.query(sql,function(err,results,fields){
		finish(flag);
		flag++;
		const checkMail = results.length;
		if(checkMail!=0)flag=20;
		finish(flag);
	});

	//END OF CHECKING SAME INPUTS
	//MAKING CONCLUSION WHAT HAPPENED AND FINALIZING REGISTRATION
	function finish(flag){
		if(flag>3){
			if(flag == 5){
				
				flag = 0;
				res.write( "<p>Your username have illegal characters.Make sure you are using numbers and (English)letters!</p>");
				res.write( "<button onclick=location.href='/register'>OK</button>");
				
				
				
			}else if(flag == 10){
				
				flag = 0;
				res.write( "<p>Your password have white characters or less than 8 characters.Make sure you are using numbers,simbols and letters!</p>");
				res.write( "<button onclick=location.href='/register'>OK</button>");
				
				
				
			}else if(flag == 15){
				
				flag = 0;
				res.write( "<p>Username is in use!</p>");
				res.write ("<button onclick=location.href='/register'>OK</button>");
				
				
				
			}else if(flag == 20){
				
				flag = 0;
				res.write ("<p>Mail is in use!</p>");
				res.write ("<button onclick=location.href='/register'>OK</button>");
				
				
				
			}else if(flag == 4){
	
				flag = 0;
				sql = "INSERT INTO usersdb.users (username,password,email) VALUES ('"+uname+"','"+psw+"','"+mail+"');";
	 
				connection.query(sql);
				res.write ("<p>Registration was successfull.You'll recieve confirmation email!</p><br><button onclick=location.href='/'>OK</button>");
								
			}
			
	}}
});

module.exports=router;