const express = require('express');
const router = express.Router();
const connection = require('../db/db.js');

router.get('/',function(req,res,next){
	
	if(req.session.id){

		res.redirect('secure');
		
	}else{
		
		res.render('login');
	
	}
});

router.post('/',function(req,res,next){
	
	const name = req.body.username;
	const pasw = req.body.password;
	
	
	//SQL QUERY FOR LOGIN CHECK
	const sql = "SELECT * FROM usersdb.users WHERE usersdb.users.username ="+"'"+name+"'"+" && usersdb.users.password='"+pasw+"'";
	
	connection.query(sql,function(err,results,fields){
	
		if(!results.length){
			
			res.redirect('login');
			
		}else{
		    
			const stringRes = JSON.parse(JSON.stringify(results));//PARSING SQL RESULTS TO ACCES USER INFORMATIONS
			
			req.session.id = stringRes[0].iduser;
			
			res.redirect('secure');
			
		}
	});
	
});

module.exports = router;
