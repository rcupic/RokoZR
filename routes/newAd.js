const express = require('express');
const router = express.Router();
const connection = require('../db/db.js');

router.get('/',function(req,res,next){

	res.render('newAd');

});

router.post('/',function(req,res,next){
		
	//SQL QUERY FOR CHECKING ACTIVE AD
	let sql = "SELECT idad FROM usersdb.users,usersdb.ads WHERE users.username='"+req.session.username+"' AND ads.active=1;";

	connection.query(sql,function(err,results,fields){//CHECK IF THERE IS ALREADY ACTIVE AD
		
		if(results.length!=0){//IF HE HAVE AD THEN SEND HIM TO HIS AD
			
			res.redirect('/myAd');
			
		}else{
			//SQL QUERY FOR CREATING NEW AD
			sql = "INSERT INTO usersdb.ads(iduser,cathegory,name,value,description) VALUES ("+req.session.id+",'"+req.body.adCathegory+"','"+req.body.adName+"',"+req.body.adAmount+",'"+req.body.adDescription+"');";
						
			connection.query(sql,function(err,results,fields){
				//THEN SERVE CLIENT HIS AD
				res.render('myAd',{name: req.body.adName,value: req.body.adAmount,cathegory: req.body.adCathegory,description: req.body.adDescription});
				
			})
		}
	})
});


module.exports = router;