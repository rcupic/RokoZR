const express = require('express');
const router = express.Router();
const socket = require('../routes/sockets.js');
const connection = require('../db/db.js');
const dbHandler = require('../service/dbHandler.js');
const Promise = require('promise');

router.get('/',function(req,res,next){
	
	let sql = "SELECT * FROM usersdb.ads,usersdb.users WHERE usersdb.users.iduser="+req.session.id+" AND usersdb.users.iduser = usersdb.ads.iduser AND usersdb.ads.active = 1";
	
	connection.query(sql,function(err,results,fields){//TREBA PROVJERITI PRIJE IMA LI UOPCE TRENUTNE REKLAME

		if(results.length){
			
			const stringRes = JSON.parse(JSON.stringify(results));
			res.render('myAd',{name: stringRes[0].name,likes: stringRes[0].likes,value: stringRes[0].value,cathegory: stringRes[0].cathegory, description: stringRes[0].description});
		
		}else{
			
			res.redirect('/secure');
			
		}
		
	});
});

router.post('/',function(req,res,next){
	
	const promise = new Promise(function(){
		
		dbHandler.checkPassword(req.body.password,function(err,result){
			
			if(err){
				
				res.status(500).json(err);
				return;
			
			}
			console.log('1');
		});
	}).then(
		
		dbHandler.collectCoins(req.session.id,function(err,results){
			
			if(err){
				
				res.status(500).json(err);
				return;
				
			}
			console.log('2');
		})	
	).then(
		dbHandler.deactAd(req.session.id,function(err,results){
			
			if(err){
				
				res.status(500).json(err);
				return;
				
			}
			console.log('3');
			res.redirect('myAd');
		})
	);
});

module.exports = router;
