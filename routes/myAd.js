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
	
	const promise = new Promise(function(resolve,reject){
		
		dbHandler.checkPassword(req.body.password,function(err,result){
			
			if(err){
				
				console.log(err);
				reject();
				
			}else{
				
				resolve();
				
			}
		});
	});
	
	promise.then(function(fromResolve){
		
		dbHandler.collectCoins(req.session.id,function(err,results){
				
			if(err){
					
				console.log(err);
				reject();
			
			}		
		});
	}
	).then(function(fromResolve){
	
		dbHandler.deactAd(req.session.id,function(err,results){
				
			if(err){
					
				console.log(err);
				reject();
				
			}
				
			res.redirect('secure');
				
			});
	}
	).catch(function(fromReject){
		
		console.log('rejected!');
		res.redirect('myAd');
		
	});
});

module.exports = router;
