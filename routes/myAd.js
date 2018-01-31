const express = require('express');
const router = express.Router();
const dbHandler = require('../service/dbHandler.js');
const Promise = require('promise');

router.get('/',function(req,res,next){
	
	dbHandler.getMyAd(req.session.id,function(err,results){
		
		if(err){
			
			console.log(err);
			return;
			
		}else if(results){
			
			res.render('myAd',{name: results.name,likes: results.likes,value: results.value,cathegory: results.cathegory, description: results.description});
		
		}else{
			
			res.redirect('/secure');
			
		}
	});
});

router.post('/',function(req,res,next){
	
	const promise = new Promise(function(){
		
		dbHandler.checkPassword(req.body.password,function(err,result){
			
			if(err){
				
				console.log(err);
				return;
			
			}
			
		});
	}).then(
		
		dbHandler.collectCoins(req.session.id,function(err,results){
			
			if(err){
				
				console.log(err);
				return;
				
			}
			
		})	
	).then(
		dbHandler.deactAd(req.session.id,function(err,results){
			
			if(err){
				
				console.log(err);
				return;
				
			}
			
			res.redirect('myAd');
		})
	);
});

module.exports = router;
