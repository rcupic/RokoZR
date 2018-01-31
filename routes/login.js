const express = require('express');
const router = express.Router();
const dbHandler = require('../service/dbHandler.js');

router.get('/',function(req,res,next){
	
	if(req.session.id){

		res.redirect('secure');
		
	}else{
		
		res.render('login');
	
	}
});

router.post('/',function(req,res,next){
	
	dbHandler.checkLogIn({name : req.body.username,pass : req.body.password},function(err,results){
		
		if(err){
			
			res.redirect('login');
			
		}else{
			
		req.session.id = results;
			
		res.redirect('secure');
		}
	});
	
});

module.exports = router;
