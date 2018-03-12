const express = require('express');
const router = express.Router();
const dbHandler = require('../service/dbHandler.js');
const Promise = require('promise');

router.get('/',function(req,res) {
	
	dbHandler.getMyAd(req.session.id,function(err,results) {
		
		if(err) {
			
			return err;
			
		}else if(results) {
			
			res.render('myAd',{name: results.name,likes: results.likes,value: results.value,cathegory: results.cathegory, description: results.description});
		
		}else{
			
			res.redirect('/secure');
			
		}
	});
});

router.post('/',function(req,res) {
	
	const promise = new Promise(function(resolve,reject) {
		
		dbHandler.checkPassword(req.body.password,function(err) {
			
			if(err) {
				
				reject();
				
			}else{
				
				resolve();
				
			}
		});
	});
	
	promise.then(function() {
		
		dbHandler.collectCoins(req.session.id,function() {
				
	
		});
	}
	).then(function() {
	
		dbHandler.deactAd(req.session.id,function() {

				
			res.redirect('secure');
				
			});
	}
	).catch(function() {
		
		res.redirect('myAd');
		
	});
});

module.exports = router;
