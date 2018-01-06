const express = require('express');
const router = express.Router();
const connection = require('../db/db.js');

/*GET LOGIN PAGE*/
router.get('/',function(req,res,next){
	
	if(req.session.username){//IF USER IS LOGGED IN

		res.redirect('secure');
		
	}else{
		
		res.render('login');
	
	}
});

router.post('/',function(req,res,next){
	
	console.log('POSTING LOGIN');
	const name = req.body.username;
	const pasw = req.body.password;
	
	
	//SQL QUERY FOR LOGIN CHECK
	const sql = "SELECT * FROM usersdb.users WHERE usersdb.users.username ="+"'"+name+"'"+" && usersdb.users.password='"+pasw+"'";
	
	connection.query(sql,function(err,results,fields){
	
		if(!results.length){
			connection.destroy();
			res.redirect('login');
			
		}else{
		    
			const stringRes = JSON.parse(JSON.stringify(results));//PARSING SQL RESULTS TO ACCES USER INFORMATIONS
			req.session.id = stringRes[0].iduser;
			req.session.username = stringRes[0].username;
			req.session.hearts = stringRes[0].hearts;
			req.session.rank = stringRes[0].rank;
			connection.destroy();
			res.redirect('secure');
			
		}
	});
	
});

module.exports = router;