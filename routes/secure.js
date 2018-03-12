const express = require('express');
const router = express.Router();
const dbHandler = require('../service/dbHandler.js');

router.get('/',function(req,res) {
	
	if(req.session.id) {//CHECK IF USER IS LOGGED IN
		
		dbHandler.searchForUser(req.session.id,function(err,results) {
			
			res.render('secure',{name: results[0].username,heart: results[0].hearts,rank: results[0].rank,picture: results[0].picture});
			
		});
			
	}else{
		
		res.redirect('/login');
		
	}
	
});

module.exports = router;
